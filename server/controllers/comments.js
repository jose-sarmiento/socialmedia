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

    const commentObj = {
        _id: new mongoose.Types.ObjectId(),
        userId: req.user._id,
        userName: req.user.fullname,
        userProfileImage: req.user.profileImage,
        comment: req.body.comment,
    }

    post.comments.push(commentObj);
    post.meta.comments += 1;
    post = await post.save();

    res.status(StatusCodes.OK).json({ 
        comment: post.comments.id(commentObj._id), 
        created: true 
    });
};

const updateComment = async (req, res) => {
    let post = await Post.findById(req.params.postId);
    if (!post) throw new NotFound("Post not found");

    let comment = post.comments.id(req.params.commentId);
    comment.comment = req.body.comment;
    await post.save();

    res.status(StatusCodes.OK).json({ comment, updated: true });
};

const deleteComment = async (req, res) => {
    let post = await Post.findById(req.params.postId);
    if (!post) throw new NotFound("Post not found");

    post.comments.id(req.params.commentId).remove();
    post.meta.comments -= 1;
    await post.save();

    res.status(StatusCodes.OK).json({ deleted: true, message: "Comment deleted successfully" });
};

const likeComment = async (req, res) => {
    let post = await Post.findById(req.params.postId);
    if (!post) throw new NotFound("Post not found with the given id");

    let comment = post.comments.id(req.params.commentId);
    if (!comment) throw new NotFound("Comment not found in the given post id");

    let reactor = comment.reactors.findIndex(x => x.equals(req.user._id));

	if (reactor < 0) {
		comment.reactors.push(req.user._id);
		comment.meta.likes += 1;
		await post.save();
		return res.status(StatusCodes.OK).json({
			created: true,
			message: "Successfully like the comment"
		});
	}

	comment.reactors.pull(req.user._id);
	comment.meta.likes -= 1;
	await post.save();
	res.status(StatusCodes.OK).json({
		deleted: true,
		message: "Successfully unlike the comment"
	});
};

const createReply = async (req, res) => {
    let post = await Post.findById(req.params.postId);
    if (!post) throw new NotFound("Post not found with the given id");

    let comment = post.comments.id(req.params.commentId);
    if (!comment) throw new NotFound("Comment not found in the given post id");

    const replyObj = {
        _id: new mongoose.Types.ObjectId(),
        userId: req.user._id,
        userName: req.user.fullname,
        userProfileImage: req.user.profileImage,
        reply: req.body.reply,
        createdAt: + new Date(),
    }
    comment.replies.push(replyObj);
    comment.meta.replies += 1;
    await post.save();

    res.status(StatusCodes.CREATED).json({ 
        reply: replyObj, 
        created: true 
    });
};

const updateReply = async (req, res) => {
    let post = await Post.findById(req.params.postId);
    if (!post) throw new NotFound("Post not found with the given id");

    let comment = post.comments.id(req.params.commentId);
    if (!comment) throw new NotFound("Comment not found in the given post id");

    let reply = comment.replies.id(req.params.replyId);
    if (!reply) throw new NotFound("Reply not found in the given post comment");
    
    reply.reply = req.body.reply;
    await post.save();

    res.status(StatusCodes.OK).json({ updated: true });
};

const deleteReply = async (req, res) => {
    let post = await Post.findById(req.params.postId);
    if (!post) throw new NotFound("Post not found with the given id");

    let comment = post.comments.id(req.params.commentId);
    if (!comment) throw new NotFound("Comment not found in the given post id");

    comment.replies.id(req.params.replyId).remove();
    comment.meta.replies -= 1;
    await post.save();

    res.status(StatusCodes.OK).json({ deleted: true });
};

const likeReply = async (req, res) => {
    let post = await Post.findById(req.params.postId);
    if (!post) throw new NotFound("Post not found with the given id");

    let comment = post.comments.id(req.params.commentId);
    if (!comment) throw new NotFound("Comment not found in the given post id");

    let reply = comment.replies.id(req.params.replyId);
    if (!reply) throw new NotFound("Reply not found in the given comment id");

    let reactor = reply.reactors.findIndex(x => x.equals(req.user._id));

	if (reactor < 0) {
		reply.reactors.push(req.user._id);
		reply.meta.likes += 1;
		await post.save();
		return res.status(StatusCodes.OK).json({
			created: true,
			message: "Successfully like the reply"
		});
	}

	reply.reactors.pull(req.user._id);
	reply.meta.likes -= 1;
	await post.save();
	res.status(StatusCodes.OK).json({
		deleted: true,
		message: "Successfully unlike the reply"
	});
};

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    likeComment,
    createReply,
    updateReply,
    deleteReply,
    likeReply,
};
