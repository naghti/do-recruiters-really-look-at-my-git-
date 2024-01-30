import {NextResponse} from "next/server";
import {currentProfile} from "@/lib/current-profile";
import {db} from "@/lib/db";

export async function PATCH (
    req: Request,
    { params }: { params: {serverId: string} }
) {
    try {
        const profile = await currentProfile()
        const { name, imageUrl } = await req.json()

        if (!profile) {
            return new NextResponse("unathorized", { status: 401 })
        }

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id
            },
            data: {
                name,
                imageUrl,
            }
        })

        return NextResponse.json(server)

    } catch (e) {
        console.log("server ID PATH",e)
        return new NextResponse("internal error", { status: 500 })
    }
}

export async function DELETE (
    req: Request,
    { params }: { params: {serverId: string} }
) {
    try {
        const profile = await currentProfile()

        if (!profile) {
            return new NextResponse("unathorized", { status: 401 })
        }

        const server = await db.server.delete({
            where: {
                id: params.serverId,
                profileId: profile.id
            }
        })

        return NextResponse.json(server)

    } catch (e) {
        console.log("server ID delete",e)
        return new NextResponse("internal error", { status: 500 })
    }
}