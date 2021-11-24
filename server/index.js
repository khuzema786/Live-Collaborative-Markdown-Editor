const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const cors = require("cors");
const mongoose = require("mongoose");
const Document = require("./Document");

mongoose.connect(
  "mongodb+srv://admin:0000@cluster0.k0p1o.mongodb.net/markdownDocs?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const findOrCreateDocument = async (id) => {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: "" });
};

io.on("connection", (socket) => {
  socket.on("new-operations", (data) => {
    io.emit(`new-remote-operations-${data.groupId}`, data.value);
  });

  socket.on("save-document", async (data) => {
    // await Document.findByIdAndUpdate(data.groupId, { data: data.value });
  });
});

app.get("/groups/:id", async (req, res) => {
  const { id } = req.params;

  const { data } = await findOrCreateDocument(id);

  res.send(data);
});

http.listen(4000, () => {
  console.log("listening on *:4000");
});
