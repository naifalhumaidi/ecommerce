import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


const middleware = async (req: NextRequest) => {
    if( await isAuthenticated === false)
    {
        return new NextResponse(
            "Unauthorized",
            {
                status:401,
                    headers:{
                        "www-authenticate" : "basic"
                    }
            }
        )
    }
};

const isAuthenticated = async (req:NextRequest)=>{
    return Promise.resolve(false);
}

const config = { matcher: "/admin/:path*" }

export default middleware;