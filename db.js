import mongoose from "mongoose";

const mongoURI = "mongodb+srv://shreyanshguptaphy:social123@cluster0.qgyawao.mongodb.net/test";

mongoose.set('strictQuery', false)
const connectToMongo = ()=>{
    console.log("connection Building with DB");
    mongoose.set('strictQuery', false)
    mongoose.connect(mongoURI).then(()=>{
        console.log("Connected to mongo successfully");
    }).catch((err)=>{
        console.log({error:err.message});
    });
}

export default connectToMongo;