"use server"

import { cloudinary } from "@/lib/cloudinary"

export async function uploadImage(file: File): Promise<string> {
  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const base64 = buffer.toString("base64")
    const dataURI = `data:${file.type};base64,${base64}`

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload(
        dataURI,
        {
          resource_type: "image",
          folder: "el-carbonal-fc",
        },
        (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        },
      )
    })

    return result.secure_url
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error)
    throw new Error("Failed to upload image")
  }
}

export async function deleteImage(publicId: string): Promise<void> {
  try {
    await new Promise<void>((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error,) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error)
    throw new Error("Failed to delete image")
  }
}
