import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

try {
  cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME as string, 
    api_key: process.env.API_CLOUD_KEY as string, 
    api_secret: process.env.API_CLOUD_SECRET as string 
  });
} catch (error) {
  console.error("Error during Cloudinary configuration:", error);
}

export const POST = async (req: NextRequest) => {

  const data = await req.formData();
  const image = data.get("image") as File | null;

  try {
    if (!image) {
      return NextResponse.json("No image was uploaded", { status: 400 });
    }
  
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
  
    const res = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream({}, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result!);
      }).end(buffer);
    });
  
    return NextResponse.json({
      message: "Image upload",
      url: res.secure_url,
    });
  } catch (error) {
    return NextResponse.json("Error during image upload", { status: 501 });
  }
}
