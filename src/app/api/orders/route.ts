import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new NextResponse(JSON.stringify({ message: 'No estás autenticado' }), { status: 401 });
    }

    let orders;

    if (session.user.isAdmin) {
      orders = await prisma.order.findMany();
    } else {
      orders = await prisma.order.findMany({
        where: {
          userEmail: session.user.email || undefined, // Asegúrate de que userEmail no sea nulo
        },
      });
    }

    return new NextResponse(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error('Error en las rutas:', error);
    return new NextResponse(JSON.stringify({ message: 'Algo salió mal en las rutas' }), { status: 500 });
  }
};

export const POST = async (req:NextRequest) => {
  const session = await getAuthSession()

  if(session) {
    try {
      const body = await req.json()
      if (session.user) {
        const order = await prisma.order.create({
          data:body
        });
        return new NextResponse(JSON.stringify(order.id), {status:201})
      }
    } catch (error) {
      
    }
  }
}