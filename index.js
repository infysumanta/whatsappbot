const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (message) => {
  if (message.body === "Hi") {
    client.sendMessage(message.from, "Hello");
  }
  if (message.body === "Hello") {
    const chat = await message.getChat();
    const contact = await message.getContact();
    await chat.sendMessage(`Hello @${contact.id.user}`, {
      mentions: [contact],
    });
  }
});

client.initialize();
