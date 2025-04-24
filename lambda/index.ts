import { SNSEvent } from "aws-lambda";


export async function main(event: SNSEvent): Promise<void> {


  //filter out important information
  const records = event.Records.map(record => {
    const { Message, Subject } = record.Sns;
    return { subject: Subject, message: Message };
  })[0];

  //concatenate message
  let prefix;
  switch (records.subject) {
    case "info": {
      prefix = "ℹ️ Info: "
      break;
    }
    case "success": {
      prefix = "✅ Success: ";
      break;
    }
    case "error": {
      prefix = "❌ Error: ";
      break;
    }
    default: {
      prefix = "";
      break;
    }
  }
  const finalMessage = prefix + records.message


  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) {
    throw new Error("SLACK_WEBHOOK_URL is not defined in the environment variables.");
  }

  var headers = {
    "Content-type": "application/json"
  }

  const response = await fetch(url,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        "text": finalMessage
      })
    });
  const data = await response.text();
  console.log("Slack Response: ", data);
}
