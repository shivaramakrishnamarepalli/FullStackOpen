require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
morgan.token("data", (req) => {
  return JSON.stringify(req.body);
});
const app = express();
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :data",
    {
      skip: function (req) {
        return req.method !== "POST";
      },
    }
  )
);

app.get("/", (req, res) => {
  res.send("hello ");
});
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      console.log("persons fetched successfully");
      res.json(persons);
    })
    .catch((error) => next(error));
});
app.get("/info", (req, res, next) => {
  Person.estimatedDocumentCount()
    .then((totalPersons) => {
      console.log("info fetched successfully");
      const responseHtml = `Phonebook has info for ${totalPersons}<br>${Date()}`;
      res.send(responseHtml);
    })
    .catch((error) => next(error));
});
app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((personFound) => {
      if (personFound) {
        console.log(
          `${personFound.name} ${personFound.number} fetched successfully `
        );
        res.json(personFound);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});
app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then((personDeleted) => {
      if (personDeleted) {
        console.log("in the personDelete function", personDeleted);
        console.log(
          `${personDeleted.name} ${personDeleted.number} deleted successfully!`
        );
        res.status(204).end();
      } else {
        res.status(204).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});
app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "missing name or number" });
  }
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      console.log(
        `${updatedPerson.name} ${updatedPerson.number} update successfully`
      );
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
