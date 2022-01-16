const path = require('path')
const ffmpeg = require('fluent-ffmpeg')
const sharp = require('sharp')
const chalk = require('chalk')
const router = require('express').Router()
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')
const paginate = require('../middleware/paginate')
const { Post, validatePost } = require('../models/Post')

router.get('/', auth, paginate(Post), (req, res) => {
  res.json(res.paginatedResults)
})

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author')
    res.json(post)
  } catch(error) {
    console.log(error)
    res.status(500).json({msg: 'Something went wrong'})
  }
})

router.post('/', auth, upload.array('files'), async (req, res) => {
  const { error } = validatePost(req.body)
  if (error) return res.status(400).send({ msg: error.details[0].message })

  try {
    const newPost = await new Post({ author: req.user._id })
    if (req.body.body) {
      newPost.body = req.body.body
    }

    if (req.files) {
      newPost.multimedia = await Promise.all(
        req.files.map(async file => {
          const type = file.mimetype.split('/')[0]
          let thumbnail
          if (type === 'image') {
            thumbnail = await generateThumb(file)
          } else {
            thumbnail = createThumbFromVideo(file)
          }
          return {
            type,
            path: `uploads/${file.filename}`,
            thumbnail: `uploads/${thumbnail}`,
          }
        })
      )
    }

    await newPost.save()
    res.status(201).json({ msg: 'Post successfully created' })
  } catch (error) {
    console.error(chalk.red.bold(error))
    res.status(500).json({ msg: 'Something went wrong, Please try again' })
  }
})

router.get('/recent', async (req, res) => {
  try {
    const posts = await Post.find({
      createdAt: {
        $gte: req.body.date,
        $lt: '2013-11-19T20:00:00Z',
      },
    })
    res.json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Something went wrong' })
  }
})

module.exports = router

async function generateThumb(file) {
  const [name, ext] = file.filename.split('.')
  const thumbname = name + '-thumb.' + ext
  await sharp(file.path, { failOnError: false })
    .resize({ width: 500, fit: 'contain' })
    .withMetadata()
    .toFile(path.resolve(file.destination, thumbname))
  return thumbname
}

function createThumbFromVideo(video) {
  let newFilename = ''
  const filename = video.filename.split('.')[0]
  const thumbnailName = 'public/uploads/' + filename + '-thumb.png'

  ffmpeg({ source: video.path })
    .on('filenames', filenames => {
      newFilename = filenames[0].replace('public/uploads/', '')
    })
    .takeScreenshots(
      {
        filename: thumbnailName,
        timemarks: [2],
      },
      '.'
    )
  return newFilename
}
