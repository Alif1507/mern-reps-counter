import mongoose from "mongoose";
import Rep from "../model/rep.js";

export const repGet = async (req, res) => {
  try {
    const reps = await Rep.find({});
    res.status(200).json({ success: true, data: reps });
  } catch (error) {
    console.log("error ngefecth:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const repPost = async (req, res) => {
  const rep = req.body;

  if (!rep.name || !rep.reps || !rep.waktu) {
    return res.status(404).json({ success: false, message: "harus isi semua" });
  }

  const newRep = new Rep(rep);

  try {
    await newRep.save();
    res.status(201).json({ success: true, data: newRep });
  } catch (error) {
    console.log("error dalam buat", error.message);
    res.status(500).json({ succses: false, message: "server error" });
  }
};

export const repPut = async (req, res) => {
  const { id } = req.params;

  const rep = req.body;

  //cari berdasarkan id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({success:false, message:"id not found"})
  }

  try {
  const updatedRep = await Rep.findByIdAndUpdate(id, rep, {new:true})
  res.status(200).json({success:true, data: updatedRep})  
  } catch (error) {
    res.status(500).json({success:false, message:"server error, could not update"})
  }

};

export const repDelete = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({success:false, message:"id not found"})
  }

  try {
    await Rep.findByIdAndDelete(id)
    res.status(200).json({success: true, message: "rep deleted"})
  } catch (error) {
    console.error("error saat delete product:", error.message);
    res.status(500).json({success: false, message:"SERVER NOT FOUND"})
  }

  
}
