const eventModel = require("../models/eventModel");
const validate = require("../validation/validator");

const createEvent = async function (req, res) {
  try {
    const requestBody = req.body;

    if (!validate.isValidRequestBody(requestBody)) {
      res.status(400).send({
        status: false,
        message: "Invalid request parameters. Please provide Eventdetails",
      });
      return;
    }
    const { eventTitle, eventName, invitedUsers, userId } = requestBody;
    // Validation starts
    if (!validate.isValid(eventTitle)) {
      res
        .status(400)
        .send({ status: false, message: "eventTitle is required" });
      return;
    }
    if (!validate.isValid(eventName)) {
      res.status(400).send({ status: false, message: "eventName is required" });
      return;
    }

    if (!validate.isValid(invitedUsers)) {
      res
        .status(400)
        .send({ status: false, message: "invitedUsers is required" });
      return;
    }

    // Validation ends
    const eventData = await eventModel.create({
      eventTitle,
      eventName,
      invitedUsers,
      createdBy: userId,
    });
    res.status(201).send({
      status: true,
      message: " EventCreated Successfully",
      data: eventData,
    });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};
//---------------------------------------- get events ----------------------------------------------------------//
const getEvents = async function (req, res) {
  try {
    const createdBy = req.userId;
    const filterQuery = { isDeleted: false, createdBy: createdBy };
    const queryParams = req.query;
    const { sort, eventName } = queryParams;
    if (validate.isValid(eventName)) {
      filterQuery["eventName"] = eventName;
    }
    const events = await eventModel
    .find({filterQuery })
    .populate({ path: "createdBy", select: { name: 1, email:1,_id:0 } })
    .sort({ eventTitle: sort ? sort : 1 })
    if (Array.isArray(events) && events.length === 0) {
      res.status(404).send({ status: false, message: "No events found" });
      return;
    }

    res.status(200).send({ status: true, message: "Eventlist", data: events });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};
//----------------------------------------------Eventdetails------------------------------------------------//

const inviteEventDetails = async function (req, res) {
  try {
    const createdBy = req.userId;

    let eventData = await eventModel
      .find({ invitedUsers: createdBy })
      .populate({ path: "createdBy", select: { name: 1, email: 1 ,_id:0} });
    if (!eventData) {
      res.status(404).send({
        status: false,
        msg: "Eventnot found for the requested userId",
      });
    }
    console.log(eventData);
    res.status(200).send({ status: true, message: "Success", data: eventData });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};


const getEventById = async (req, res) => {
  try {
    let eventId = req.query.eventId;
    console.log(eventId)
    const eventDetails = await eventModel
      .findById({ _id: eventId })
      .populate({ path: "invitedUsers", select: { name: 1, email: 1,_id:0 } })
      .populate({ path: "createdBy", select: { name: 1, email: 1,_id:0 } });
    return res
      .status(200)
      .send({
        status: true,
        msg: "event Data fetch successfully",
        data: eventDetails,
      });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//--------------------------------------------------------update evente-----------------------------------------------//
const updateEventById = async (req, res) => {
  try {
    let eventId = req.query.eventId;
    const requestBody = req.body;
    const { eventTitle, eventName, invitedUsers } = requestBody;
    const filterQuery = {};
    if (isValid(eventTitle)) {
      filterQuery["eventTitle"] = eventTitle;
    }
    if (isValid(eventName)) {
      filterQuery["eventName"] = eventName;
    }

    if (
      !(typeof invitedUsers === "undefined" || typeof invitedUsers === "null")
    ) {
      filterQuery["invitedUsers"] = users;
    }
    const updatedEvent = await eventModel.findOneAndUpdate(
      { _id: eventId },
      filterQuery,
      { new: true }
    );
    return res
      .status(200)
      .send({ status: true, msg: "successfully updated", data: updatedEvent });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  inviteEventDetails,
  getEventById,
  updateEventById,
};
