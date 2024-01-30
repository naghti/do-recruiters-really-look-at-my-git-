import { v4 as uuidv4 } from "uuid";

import {NextResponse} from "next/server";
import {currentProfile} from "@/lib/current-profile";
import {db} from "@/lib/db";

export async function PATCH (
    req: Request,
    { params } : { params: { serverId: string } }
) {
    try {
        const profile = await currentProfile()

        if (!profile) {
            return new NextResponse("unathorized", { status: 401 })
        }

        if (!params.serverId) {
            return new NextResponse("server ID Missing", {status: 400})
        }

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id,
            },
            data: {
                inviteCode: uuidv4()
            }
        })

        return NextResponse.json(server)

    } catch (e) {
        console.log("server id", e)
        return new NextResponse("internal error", { status: 500 })
    }
}