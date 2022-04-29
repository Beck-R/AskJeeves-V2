import nodeHtmlToImage = require("node-html-to-image")
import fetch from "node-fetch";
import { Message, TextChannel } from "discord.js";
const { blacklist } = require("../config.json");

// get quote from kanye api
async function getQuote() {
  const response = await fetch("https://api.kanye.rest");
  const json = await response.json();

  const quote = json.quote;
  const text = `${quote} - Kayne West AKA. Ye`;

  return text;
}

export default {
  name: "ye-quote",
  category: "fun",
  description:
    "Overlays a random Ye quote over a random sfw/nsfw anime picture from a specified category. To view the different categories go to https://waifu.pics/docs.",
  usage: "ye-quote <sfw/nsfw> <category>",
  example: "ye-quote sfw neko",
  callback: async (message: Message, channel: TextChannel, ...args: string[]) => {

    const quote = await getQuote();

    // get waifu image
    const fw = args[0];
    const category = args[1];

    const response = await fetch(`https://api.waifu.pics/${fw}/${category}`);
    const json = await response.json();

    const image = json.url;

    // create image
    nodeHtmlToImage({
      output: "./commands/command-assets/kayneQuote/output.png",
      html: `<html>
                        <head>
                            <style>
                                #bg {
                                    margin: 0;
                                    padding: 0;
                                    min-height: 100vh;
                                    font-family: Arial, Helvetica, sans-serif;
                                    background-image: url(${image});
                                    background-color: #282a35;
                                    background-size: contain;
                                    background-position: center;
                                    background-repeat: no-repeat;
                                }
                    
                                #container {
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: space-around;
                                    align-items: center;
                                    height: 100vh;
                                }
                    
                                #quote {
                                    color: white;
                                    font-size: 24px;
                                    background-color: #282a35cb;
                                    padding: 10px;
                                    border-radius: 4px;
                                    margin-left: 20px;
                                    margin-right: 20px;
                                    max-width: 600px;
                                }
                            </style>
                        </head>
                        <body id = 'bg'>
                            <div id='container'>
                                <div id='quote'>${quote}</div>
                            </div>
                        </body>
                    </html>`,
    }).then(() => {
      // send constructed image
      message.channel.send({
        files: ["./commands/command-assets/kayneQuote/output.png"],
      });
    });
  },
};
