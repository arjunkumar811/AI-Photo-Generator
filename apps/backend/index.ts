import express, { type Request, type Response } from "express";
import { TrainModel } from "common/types";
import { prismaClient } from "db";

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json()); 

app.post("/ai/training", async (req: Request, res: Response) => {
  const parseData = TrainModel.safeParse(req.body);
  if (!parseData.success) {
    res.status(400).json({
      error: parseData.error,
      message: "Invalid data",
    });
    return;
  }

  const data = await prismaClient.model.create({
    data: {
      name: parseData.data.name,
      type: parseData.data.type,
      age: parseData.data.age,
      ethnicity: parseData.data.ethnicity,
      eyeColor: parseData.data.eyeColor,
      bald: parseData.data.bald,
    },
  });

  res.json({
    message: "Model trained successfully",
    modelId: data.id,
  });
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
