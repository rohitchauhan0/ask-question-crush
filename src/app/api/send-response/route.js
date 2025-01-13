import { mailsender } from "@/libs/mailsender"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        const { responses } = await req.json();

        console.log('Responses:', responses);

        if (typeof responses === 'object' && responses !== null) {
            const formattedResponses = Object.keys(responses).map((key, index) => {
                const response = responses[key];
                return `
                    <h3>Question ${index + 1}: ${response.question}</h3>
                    <p><strong>Answer:</strong> ${response.answer}</p>
                    <p><strong>Response Time:</strong> ${response.responseTime} ms</p>
                    <hr />
                `;
            }).join("");

            await mailsender("beatfeelrc121@gmail.com", "Response", formattedResponses);

        } else {
            console.error("Expected responses to be an object, but got:", typeof responses);
        }
        
        return NextResponse.json(responses);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message });
    }
}
