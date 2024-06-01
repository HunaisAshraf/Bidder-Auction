import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse, NextRequest } from "next/server";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_KEY!,
  },
});

async function uploadToS3(file: any, fileName: any) {
  try {
    const fileBuffer = file;
    console.log("upload function");
    

    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
      Key: `${fileName}-${Date.now()}`,
      Body: fileBuffer,
      ContentType: file.type,
    };





    const command = new PutObjectCommand(params);

    console.log("command complete",command);
    

    const data = await s3Client.send(command);

    console.log(data);
  } catch (error:any) {
    console.log(error.message);
  }
}

export async function POST(request: NextRequest) {
  try {

    console.log(process.env.NEXT_PUBLIC_AWS_S3_REGION);
    console.log(process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID);
    console.log(process.env.NEXT_PUBLIC_AWS_S3_SECRET_KEY);
    

    const formData = await request.formData();
    console.log("form data",formData);
    const file = formData.get("image");
    console.log("file",file);

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "file is required",
        },
        { status: 400 }
      );
    }
    console.log("file received");
    
    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("file buffer",buffer);
    
    const fileName = await uploadToS3(buffer, file.name);
    console.log("file name",fileName);
  } catch (error) {
    console.log("error in router",error);
    return NextResponse.json({ success: false });
  }
}
