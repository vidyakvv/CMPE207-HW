'use strict';
const AWS = require('aws-sdk');

//funtion exported from the file
//Takes 3argument by deafualt
//event contains info about req body, url pathParameters
//context info about execution environment
exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;
//parse from string to JSON
  const { Id, CourseNumber, Name } = JSON.parse(event.body);

  const params = {
    TableName: "Catalog",
    Item: {
      Id: Id,
      CourseNumber: Coursenumber,
      Name: Name
    }
  };

  try {
    const data = await documentClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch(err) {
    responseBody = `Unable to put item: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: responseBody
  };

  return response;
};
