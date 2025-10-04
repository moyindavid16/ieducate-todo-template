import {NextRequest, NextResponse} from "next/server";
import todoManager from "@/domains/api/managers/todoManager";

export async function GET(request: NextRequest) {
  try {
    const {searchParams} = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json({error: "Username query parameter is required"}, {status: 400});
    }

    const todos = await todoManager.getTodos(username);

    return NextResponse.json({todos});
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json({error: "Failed to fetch todos"}, {status: 500});
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {title, description, username} = body;

    if (!title || !description || !username) {
      return NextResponse.json({error: "Title, description, and username are required"}, {status: 400});
    }

    const newTodo = await todoManager.createTodo({
      title: title.trim(),
      description: description.trim(),
      username: username.trim(),
    });

    return NextResponse.json({todo: newTodo}, {status: 201});
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json({error: "Failed to create todo"}, {status: 500});
  }
}
