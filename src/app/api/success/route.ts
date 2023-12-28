import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req:NextRequest) => {
  try {
    const body = await req.json()
    await prisma.order.update({
        where:{
            id:body
        },
        data:{status:'completado'}
    })
    return new NextResponse(JSON.stringify({message:'Order has been updated!'}), {status:200})
  } catch (error) {
    return new NextResponse(JSON.stringify({message:'Something went wrong!'}), {status:500})
  }
}