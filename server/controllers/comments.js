const mongoose = require("mongoose");
const { Post } = require("../models/Post");
const { NotFound, BadRequest } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { validateComment } = require("../models/Comment");

const createComment = async (req, res) => {
    const { error } = validateComment(req.body);
    if (error) throw new BadRequest(error.details[0].message);

    let post = await Post.findById(req.params.postId);
    if (!post) throw new NotFound("Post not found with the given id");

    const commentId = new mongoose.Types.ObjectId();
    console.log(commentId);

    post = await Post.findOneAndUpdate(
        { _id: req.params.postId },
        {
            $push: {
                comments: {
                    _id: commentId,
                    userId: req.user._id,
                    userName: req.user.fullname,
                    userProfileImage: req.user.profileImage,
                    comment: req.body.comment,
                },
            },
            $inc: { "meta.comments": 1 },
        },
        { new: true }
    );

    const createdComment = post.comments.find(x => x._id.equals(commentId));

    res.status(StatusCodes.OK).json({ comment: createdComment, success: true });
};

const updateComment = async (req, res) => {
    let post = await Post.findOne({
        _id: req.params.postId,
        "comments._id": req.params.commentId,
    });
    if (!post) throw new NotFound("Post not found");

    const result = await Post.updateOne(
        {
            _id: req.params.postId,
            comments: {
                $elemMatch: { _id: req.params.commentId },
            },
        },
        {
            $set: { "comments.$.comment": req.body.comment },
        }
    );

    res.status(StatusCodes.OK).json({ result, updated: true });
};

const deleteComment = async (req, res) => {
    let post = await Post.findOne({ _id: req.params.postId });
    if (!post) throw new NotFound("Post not found");

    const result = await Post.updateOne(
        { _id: req.params.postId },
        {
            $pull: { comments: { _id: req.params.commentId } },
            $inc: { "meta.comments": -1 },
        }
    );

    res.status(StatusCodes.OK).json({ result, deleted: true });
};

const likeComment = async (req, res) => {
    let post = await Post.findById({ _id: req.params.postId });
    if (!post) throw new NotFound("Post not found with the given id");

    post = await Post.findOneAndUpdate(
        { _id: req.params.postId },
        {
            $push: {
                "comments.$[x].reactions": {
                    userId: req.user._id,
                    userName: req.user.fullname,
                    reaction: req.body.reaction,
                },
            },
            $inc: { "comments.$[x].meta.likes": 1 },
        },
        {
            arrayFilters: [
                { "x.userId": req.user._id, "x._id": req.params.commentId },
            ],
            new: true,
        }
    );
    res.status(StatusCodes.CREATED).json({
        reaction: {
            userId: req.user._id,
            userName: req.user.fullname,
            reaction: req.body.reaction,
        },
        created: true,
    });
};

const updateCommentReaction = async (req, res) => {
    let post = await Post.findById({ _id: req.params.postId });
    if (!post) throw new NotFound("Post not found with the given id");

    post = await Post.findOneAndUpdate(
        { _id: req.params.postId },
        {
            $set: {
                "comments.$[idx].reactions.$[x].reaction": req.body.reaction,
            },
        },
        {
            arrayFilters: [
                { "idx._id": req.params.commentId },
                { "x.userId": req.user._id },
            ],
            new: true,
        }
    );

    const comment = post.comments.find(x => x._id.equals(req.params.commentId));
    const reaction = comment.reactions.find(x => x.userId.equals(req.user._id));

    res.status(StatusCodes.CREATED).json({ reaction, updated: true });
};

const createReply = async (req, res) => {
    let post = await Post.findById({ _id: req.params.postId });
    if (!post) throw new NotFound("Post not found with the given id");

    const result = await Post.updateOne(
        {
            _id: req.params.postId,
            comments: {
                $elemMatch: {
                    _id: req.params.commentId,
                },
            },
        },
        {
            $push: {
                "comments.$.replies": {
                    userId: req.user._id,
                    userName: req.user.fullname,
                    userProfileImage: req.user.profileImage,
                    reply: req.body.reply,
                },
            },
            $inc: { "comments.$.meta.replies": 1 },
        }
    );

    res.status(StatusCodes.CREATED).json({ result, created: true });
};

const updateReply = async (req, res) => {
    let post = await Post.findById({ _id: req.params.postId });
    if (!post) throw new NotFound("Post not found with the given id");

    const result = await Post.updateOne(
        {
            _id: req.params.postId,
            "comments.replies": {
                $elemMatch: {
                    _id: req.params.replyId,
                },
            },
        },
        {
            $set: {
                "comments.replies.$.reply": req.body.reply,
            },
        }
    );

    res.status(StatusCodes.OK).json({ post, updated: true });
};

const deleteReply = async (req, res) => {
    let post = await Post.findById({ _id: req.params.postId });
    if (!post) throw new NotFound("Post not found with the given id");

    const result = await Post.updateOne(
        { _id: req.params.postId },
        {
            $pull: { "comments.$[].replies": { _id: req.params.replyId } },
            $inc: { "comments.$[].meta.replies": -1 },
        }
    );

    res.status(StatusCodes.OK).json({ result, deleted: true });
};

const likeReply = async (req, res) => {
    let post = await Post.findById({ _id: req.params.postId });
    if (!post) throw new NotFound("Post not found with the given id");

    const alreadyLiked = await Post.findOne({
        _id: req.params.postId,
        "comments.replies.reactions": { $elemMatch: { userId: req.user._id } },
    });

    let result;
    if (alreadyLiked) {
        result = await Post.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    "comments.$[].replies.$[].reactions.$[idx].reaction":
                        req.body.reaction,
                },
            },
            { arrayFilters: [{ "idx.userId ": req.user._id }] }
        );
    } else {
        result = await Post.updateOne(
            {
                _id: req.params.postId,
            },
            {
                $push: {
                    "comments.$[].replies.$[idx].reactions": {
                        reaction: req.body.reaction,
                    },
                },
            },
            { arrayFilters: [{ "idx._id": req.params.replyId }] }
        );
    }

    res.status(StatusCodes.CREATED).json({ result, created: true });
};

// db.posts.updateOne({_id: ObjectId("61be89f82f17ebb64d6dd691")}, {$push: {"comments.$[].replies.$[idx]": {"reaction": "love"}}}, {arrayFilters:[{"idx._id":ObjectId("61bf08c93a583aacbc18df03")}]})
module.exports = {
    createComment,
    updateComment,
    deleteComment,
    likeComment,
    createReply,
    updateReply,
    deleteReply,
    likeReply,
    updateCommentReaction,
};
