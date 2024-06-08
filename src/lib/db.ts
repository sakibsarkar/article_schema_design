import mongoose from "mongoose";

const connect = async () => {
  const url = `mongodb+srv://test:WqFe2k74H3I6LCEl@cluster0.xbiw867.mongodb.net/article`;
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(url as string);
    console.log("Connection Created to Mongodb");
  } catch (error) {
    console.log(error);
  }
};

export default connect;
