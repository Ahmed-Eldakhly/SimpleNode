// const Rating = require("../models/Rating")
// const Response_Code = require("../../../response-codes")
// const Response_Msg = require("../../../response-messages")
// const RatingPresenter = require("../presenter/PermissionPresenter")


// async function index(request, response,next) {

//     try {
//         const ratings = await Rating.find().populate("rater").populate("ratedBook").exec();
//         response.json(ratings.map((rate)=>{
//             return RatingPresenter.present(rate);
//         }));

//     } catch (err) {
//         next(err);
//     }
// }

// async function show(req, res, next) {

//     const { id } = request.params
//     try{
//         const rating = await Rating.findById(id).populate("rater").populate("ratedBook");
//         response.json(RatingPresenter.present(rating));
//     }catch(error){
//         next(ResponseCode.SERVER_ERROR)
//     }
// }

// async function store(req, res, next) {
//     console.log("enter Post")
//     const ratingSavingRequest = req.body
//     const rating = new Rating ({
//         rate: ratingSavingRequest.rate,
//         rater: ratingSavingRequest.rater,
//         ratedBook: ratingSavingRequest.book
//     })
//     await Rating.deleteMany({ $and: [{rater: rating.rater },{ratedBook: rating.ratedBook}] });

//     console.log("before post")
//     try {
//         const newRating = await rating.save()
//         console.log(newRating);
//         res.json(200)
//         console.log("after post")
//     }catch (err){
//         console.log(err)
//         next(err)
//     }
// }

// async function update(req, res, next) {

//     console.log(" i am update ")
//     const { bookId, userId } = req.params;
//     const prevRating = await Rating.findOne({ $and: [{rater: userId },{ratedBook: bookId }] });
//     const rating = req.body
//     const newRating = {
//         ...(rating.rate ? { rate: rating.rate } : {}),
//     }
//     console.log(id , rating)
//     try{
//         await Rating.findByIdAndUpdate({ _id: prevRating._id }, newRating)
//         res.json({
//             status : Response_Code.SUCCESS,
//             message: Response_Msg.UPDATE_MESSAGE
//         });
//     }catch(err){
//         next(err)
//     }
// }

// async function destroy(req, res, next) {
//     const {id} = req.params
//     try {
//         await Rating.deleteOne({_id: id})
//         res.json({
//             status : Response_Code.SUCCESS,
//             message: Response_Msg.DELETE_MESSAGE
//         });
//     }catch(err) {
//         next(Response_Code.SERVER_ERROR)
//     }
// }

// module.exports = {
//     index,
//     show,
//     store,
//     update,
//     destroy
// }



const Permission = require("../models/Permission")
const Response_Code = require("../../../response-codes")
const Response_Msg = require("../../../response-messages")
const PermissionPresenter = require("../presenter/PermissionPresenter")


async function index(request, response,next) {

    // try {
    //     const permissions = await Permission.find().populate("rater").populate("ratedBook").exec();
    //     response.json(ratings.map((rate)=>{
    //         return RatingPresenter.present(rate);
    //     }));

    // } catch (err) {
    //     next(err);
    // }
}

async function show(req, res, next) {

    // const { id } = request.params
    // try{
    //     const rating = await Rating.findById(id).populate("rater").populate("ratedBook");
    //     response.json(RatingPresenter.present(rating));
    // }catch(error){
    //     next(ResponseCode.SERVER_ERROR)
    // }
}

async function store(req, res, next) {
    // console.log("enter Post")
    // const ratingSavingRequest = req.body
    // const rating = new Rating ({
    //     rate: ratingSavingRequest.rate,
    //     rater: ratingSavingRequest.rater,
    //     ratedBook: ratingSavingRequest.book
    // })
    // await Rating.deleteMany({ $and: [{rater: rating.rater },{ratedBook: rating.ratedBook}] });

    // console.log("before post")
    // try {
    //     const newRating = await rating.save()
    //     console.log(newRating);
    //     res.json(200)
    //     console.log("after post")
    // }catch (err){
    //     console.log(err)
    //     next(err)
    // }
}

async function update(req, res, next) {

    // console.log(" i am update ")
    // const { bookId, userId } = req.params;
    // const prevRating = await Rating.findOne({ $and: [{rater: userId },{ratedBook: bookId }] });
    // const rating = req.body
    // const newRating = {
    //     ...(rating.rate ? { rate: rating.rate } : {}),
    // }
    // console.log(id , rating)
    // try{
    //     await Rating.findByIdAndUpdate({ _id: prevRating._id }, newRating)
    //     res.json({
    //         status : Response_Code.SUCCESS,
    //         message: Response_Msg.UPDATE_MESSAGE
    //     });
    // }catch(err){
    //     next(err)
    // }
}

async function destroy(req, res, next) {
    // const {id} = req.params
    // try {
    //     await Rating.deleteOne({_id: id})
    //     res.json({
    //         status : Response_Code.SUCCESS,
    //         message: Response_Msg.DELETE_MESSAGE
    //     });
    // }catch(err) {
    //     next(Response_Code.SERVER_ERROR)
    // }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}

