import express, { type Request, type Response } from "express";
import { GenerateImage, GenerateImageFromPack, TrainModel } from "common/types";
import { prismaClient } from "db";

const port = process.env.PORT || 8080;

const USER_ID = "123";

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
      userId: USER_ID,
    },
  });

  res.json({
    message: "Model trained successfully",
    modelId: data.id,
  });

});

app.post("ai/generate", async (req: Request, res: Response) => {
  const parseData = GenerateImage.safeParse(req.body);

  if (!parseData.success) {
    res.status(400).json({
      error: parseData.error,
      message: "Invalid data",
    });
    return;
  }

  const data = await prismaClient.outputImages.create({
    data: {
      prompt: parseData.data.prompt,
      userId: USER_ID,
      modelId: parseData.data.modelId,
      imageUrl: "",
    },
  });

  res.json({
    message: "Image generated successfully",
    imageId: data.id,
  });

});


app.post("/pack/generate", async (req: Request, res: Response) => {
  const parseData = GenerateImageFromPack.safeParse(req.body);

  if (!parseData.success) {
    res.status(400).json({
      error: parseData.error,
      message: "Invalid data",
    });
    return;
  }

  const prompts = await prismaClient.packPrompts.findMany({
    where: {
      packId: parseData.data.packId,
    },
  });

  const images = await prismaClient.outputImages.createManyReturn({
    data: prompts.map((prompt: { prompt: any; }) => ({
      prompt: prompt.prompt,
      userId: USER_ID,
      modelId: parseData.data.modelId,
      imageUrl: "",
    })),
  });
  
  res.json({
    images: images.map((image: { id: any; }) => image.id),
  });

  
});


app.get("/pack/bulk", async (req: Request, res: Response) => {
  const packs = await prismaClient.packs.findMany({})

  res.json({
    packs
  });

});
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
