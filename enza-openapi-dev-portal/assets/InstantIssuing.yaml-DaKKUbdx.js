const r=Array.from({length:3},()=>({})),e={"#/components/parameters/apiKey":r[0],"#/components/parameters/contentType":r[1],"#/components/schemas/Customer":r[2]};Object.assign(r[0],{name:"x-api-key",in:"header",required:!0,schema:{type:"string"}});Object.assign(r[1],{name:"Content-Type",in:"header",required:!0,schema:{type:"string",default:"application/json"}});Object.assign(r[2],{required:["RequestType","AccountNum","BranchName","CardRefNum","EmbossedName","NationalId","Passport","FirstName","LastName"],type:"object",properties:{RequestType:{type:"string",description:"- `1-NewAccountNewCustomer`: New customer (requires fields `FirstName`,`LastName`).\n- `2-NewAccountExistingCustomer`: Existing customer.\n"},BranchName:{type:"string",enum:["GTBR"],description:"Branch name `GTBR`"},CardRefNum:{type:"string",description:"Card Reference Number"},EmbossedName:{type:"string",description:"Name to emboss on the card"},AccountNum:{type:"string",description:"Customer's account number"},FirstName:{type:"string",description:" `Mandatory` For new customers (`RequestType: NewAccountNewCustomer`)"},MiddleName:{type:"string"},LastName:{type:"string",description:" `Mandatory` For new customers (`RequestType: NewAccountNewCustomer`)"},NationalId:{type:"string",description:" `Mandatory` if Passport is not provided "},Passport:{type:"string",description:" `Mandatory` if NationalId is not provided "},BirthDate:{type:"string",format:"date",examples:["1990-01-01"]},Email:{type:"string",format:"email"},MobilePhone:{type:"string"},StreetTitle:{type:"string"},Zip:{type:"string"}}});const t={openapi:"3.1.1",info:{title:"Enza REST API Documentation",description:`**Welcome to the Enza REST API Developer Portal. Our API provides seamless integration for instant issuing services across Africa. This portal offers all the necessary tools, detailed documentation, and API endpoints required to empower your financial operations with real-time card issuance capabilities. Explore the portal, integrate with ease, and unlock secure, efficient, and scalable instant issuing solutions.**
`,version:"2025-02-16T14:26:47Z"},servers:[{url:"https://uat-api.enza.cloud/TX/v1"}],tags:[{name:"Customers"},{name:"Accounts"},{name:"Card Management"},{name:"Instant Issuing"}],paths:{"/accounts/by-rid/{rid}":{get:{summary:"Get Account Info",description:"Retrieve account details based on the account’s unique RID.",tags:["Accounts"],parameters:[{name:"rid",in:"path",required:!0,description:"The unique RID of the account to retrieve.",schema:{type:"string"}}],responses:{200:{description:"Successfully retrieved account information.",content:{"application/json":{schema:{type:"object",properties:{rid:{type:"string",examples:["0000112"]},type_rid:{type:"string",examples:["DebitAccTypeGTBR[RWF]"]},branch_name:{type:"string",examples:["GTBR_Branch"]},client_rid:{type:"string",examples:["000011"]},main_ccy:{type:"integer",examples:[646]}}}}}},400:{description:"Bad request, invalid data format or missing parameters."},404:{description:"Account with the given RID not found."}}}},"/cards/by-rid/{rid}":{get:{summary:"Get Card Info",description:"Retrieve detailed information of a card by its RID (External ID).",tags:["Cards"],parameters:[{name:"rid",in:"path",required:!0,description:"The unique identifier for the card (External RID).",schema:{type:"string"}}],responses:{200:{description:"Successfully retrieved card information.",content:{"application/json":{schema:{type:"object",properties:{card:{type:"object",properties:{rid:{type:"string",description:"The card external RID."},status:{type:"string",description:"The current status of the card."},pan:{type:"string",description:"The Primary Account Number (PAN) of the card."},exp_time:{type:"string",format:"date-time",description:"Expiration time of the card."}}}}}}}},404:{description:"Card not found."}}}},"/cards/tdsenrollement":{post:{summary:"Change Ecom Status",description:"Modify the Ecom Status",parameters:[e["#/components/parameters/apiKey"],e["#/components/parameters/contentType"]],tags:["Cards"],requestBody:{description:"Details for updating the TDS enrollment status of a card.",content:{"application/json":{schema:{type:"object",required:["ECstatusEnable","CardRefNum"],properties:{CardRefNum:{type:"string",description:"The PAN of the card whose Ecom Status is being updated."},ECstatusEnable:{type:"integer",description:"Ecom Status (e.g., 1 for enrolled, 0 for not enrolled)."}}}}}},responses:{200:{description:"Successful response",content:{"application/json":{schema:{type:"object",required:["message"],properties:{message:{type:"string",description:"Card Status changed successfully! (Active)"}}},examples:{successResponse:{summary:"Successful Request Example",value:{message:"Card Status changed successfully! (Active)"}}}}}},400:{description:'Bad request response "Wrong Field in the body request"',content:{"application/json":{schema:{type:"object",required:["errorMessage"],properties:{errorMessage:{type:"object",required:["errorType","statusCode","errorDetails"],properties:{errorType:{description:"Bad Request: Invalid Request Body",type:"string"},statusCode:{description:"400",type:"integer"},errorDetails:{type:"array",items:{type:"object",required:["instancePath","schemaPath","keyword","params","message"],properties:{instancePath:{description:"'/body' JSON Pointer to the part of the request body that caused the error",type:"string"},schemaPath:{description:"'#/properties/body/required' JSON Schema path indicating the validation rule that failed",type:"string"},keyword:{description:"'required' Validation keyword that failed",type:"string"},params:{description:"Additional parameters about the validation failure",type:"object",required:"-missingProperty",properties:{missingProperty:{type:"string"}}},message:{description:"Error message describing the validation failure field",type:"string"}}}}}}}},examples:{badRequestExample:{summary:"Bad Request - Missing Required Property",value:{errorMessage:{errorType:"Bad Request: Invalid Request Body",statusCode:400,errorDetails:[{instancePath:"/body",schemaPath:"#/properties/body/required",keyword:"required",params:{missingProperty:"ECstatusEnable or CardRefNum"},message:"must have required property"}]}}}}}}},500:{description:"Internal server error response",content:{"application/json":{schema:{type:"object",required:["errorMessage"],properties:{errorMessage:{type:"object",required:["errorType","statusCode","errorDetails"],properties:{errorType:{description:"This Card is already in this status",type:"string"},statusCode:{description:"500",type:"integer"},errorDetails:{type:"array",items:{type:"object",required:["message"],properties:{message:{description:"This Card is already in this status",type:"string"}}}}}}}},examples:{internalServerErrorExample:{summary:"This Card is already in this status",value:{errorMessage:{errorType:"This Card is already in this status",statusCode:"500",errorDetails:[{message:"This Card is already in this status"}]}}}}}}},504:{description:"Gateway Timeout error response",content:{"application/json":{schema:{type:"object",required:["errorMessage"],properties:{errorMessage:{type:"object",required:["errorType","statusCode","errorDetails"],properties:{errorType:{type:"string",description:"Gateway Timeout"},statusCode:{type:"integer",description:"504"},errorDetails:{type:"array",items:{type:"object",properties:{message:{description:"Task timed out after 2.02 seconds",type:"string"}}}}}}}},examples:{gatewayTimeoutExample:{summary:"Gateway Timeout Example",value:{errorMessage:{errorType:"Gateway Timeout",statusCode:504,errorDetails:[{message:"Task timed out after 2.02 seconds"}]}}}}}}}}}},"/cards/activate":{post:{summary:"Activate Card",description:"Activate a card by providing the CardStatus and CardRefNum.",parameters:[e["#/components/parameters/apiKey"],e["#/components/parameters/contentType"]],tags:["Cards"],requestBody:{description:"Details for activating a card.",content:{"application/json":{schema:{type:"object",required:["CardStatus","CardRefNum"],properties:{CardStatus:{type:"string",enum:["Active","Deactivated","New","Blocked","Referral","Lost","Stolen","Damaged","Compromised","Closed"],description:"The status of the card."},CardRefNum:{type:"string",description:"The CardRefNum of the card to be activated."}}}}}},responses:{200:{description:"Successful response",content:{"application/json":{schema:{type:"object",required:["message"],properties:{message:{type:"string",description:"Card Activated successfully!"}}},examples:{successResponse:{summary:"Successful Request Example",value:{message:"Card Activated successfully!"}}}}}},400:{description:'Bad request response "Wrong Field in the body request"',content:{"application/json":{schema:{type:"object",required:["errorMessage"],properties:{errorMessage:{type:"object",required:["errorType","statusCode","errorDetails"],properties:{errorType:{description:"Bad Request: Invalid Request Body",type:"string"},statusCode:{description:"400",type:"integer"},errorDetails:{type:"array",items:{type:"object",required:["instancePath","schemaPath","keyword","params","message"],properties:{instancePath:{description:"'/body' JSON Pointer to the part of the request body that caused the error",type:"string"},schemaPath:{description:"'#/properties/body/required' JSON Schema path indicating the validation rule that failed",type:"string"},keyword:{description:"'required' Validation keyword that failed",type:"string"},params:{description:"Additional parameters about the validation failure",type:"object",required:"-missingProperty",properties:{missingProperty:{type:"string"}}},message:{description:"Error message describing the validation failure field",type:"string"}}}}}}}},examples:{badRequestExample:{summary:"Bad Request - Missing Required Property",value:{errorMessage:{errorType:"Bad Request: Invalid Request Body",statusCode:400,errorDetails:[{instancePath:"/body",schemaPath:"#/properties/body/required",keyword:"required",params:{missingProperty:"CardRefNum or CardStatus"},message:"must have required property"}]}}}}}}},500:{description:"Internal server error response",content:{"application/json":{schema:{type:"object",required:["errorMessage"],properties:{errorMessage:{type:"object",required:["errorType","statusCode","errorDetails"],properties:{errorType:{description:"This Card Is Already Activated",type:"string"},statusCode:{description:"500",type:"integer"},errorDetails:{type:"array",items:{type:"object",required:["message"],properties:{message:{description:"This Card Is Already Activated",type:"string"}}}}}}}},examples:{internalServerErrorExample:{summary:"This Card Is Already Activated",value:{errorMessage:{errorType:"This Card Is Already Activated",statusCode:"500",errorDetails:[{message:"This Card Is Already Activated"}]}}}}}}},504:{description:"Gateway Timeout error response",content:{"application/json":{schema:{type:"object",required:["errorMessage"],properties:{errorMessage:{type:"object",required:["errorType","statusCode","errorDetails"],properties:{errorType:{type:"string",description:"Gateway Timeout"},statusCode:{type:"integer",description:"504"},errorDetails:{type:"array",items:{type:"object",properties:{message:{description:"Task timed out after 2.02 seconds",type:"string"}}}}}}}},examples:{gatewayTimeoutExample:{summary:"Gateway Timeout Example",value:{errorMessage:{errorType:"Gateway Timeout",statusCode:504,errorDetails:[{message:"Task timed out after 2.02 seconds"}]}}}}}}}}}},"/cards/deletetoken":{post:{summary:"DeleteToken Request",description:"Remove a token associated with a card using the CardRefNum.",parameters:[e["#/components/parameters/apiKey"],e["#/components/parameters/contentType"]],tags:["Cards"],requestBody:{description:"Details for deleting a token.",content:{"application/json":{schema:{type:"object",required:["CardRefNum"],properties:{CardRefNum:{type:"string",description:"The reference number of the card whose token is being deleted."}}}}}},responses:{200:{description:"Successfully deleted the token.",content:{"application/json":{schema:{type:"object",required:["message"],properties:{message:{type:"string",description:"Confirmation message that the token is deleted."}}},examples:{successResponse:{summary:"Successful Token Deletion",value:{message:"Success, Token is Deleted!"}}}}}},400:{description:'Bad request response "Wrong Field in the body request"',content:{"application/json":{schema:{type:"object",required:["errorMessage"],properties:{errorMessage:{type:"object",required:["errorType","statusCode","errorDetails"],properties:{errorType:{description:"Bad Request: Invalid Request Body",type:"string"},statusCode:{description:"400",type:"integer"},errorDetails:{type:"array",items:{type:"object",required:["instancePath","schemaPath","keyword","params","message"],properties:{instancePath:{description:"'/body' JSON Pointer to the part of the request body that caused the error",type:"string"},schemaPath:{description:"'#/properties/body/required' JSON Schema path indicating the validation rule that failed",type:"string"},keyword:{description:"'required' Validation keyword that failed",type:"string"},params:{description:"Additional parameters about the validation failure",type:"object",required:"-missingProperty",properties:{missingProperty:{type:"string"}}},message:{description:"Error message describing the validation failure field",type:"string"}}}}}}}},examples:{badRequestExample:{summary:'Bad Request - Missing Required Property "CardRefNum"',value:{errorMessage:{errorType:"Bad Request: Invalid Request Body",statusCode:400,errorDetails:[{instancePath:"/body",schemaPath:"#/properties/body/required",keyword:"required",params:{missingProperty:"CardRefNum"},message:"must have required property `CardRefNum`"}]}}}}}}},500:{description:"Token not found for the provided CardRefNum.",content:{"application/json":{schema:{type:"object",required:["errorMessage"],properties:{errorMessage:{type:"string",description:"No token was found."}}},examples:{notFoundExample:{summary:"Token Not Found",value:{errorMessage:"Token not found for the provided CardRefNum."}}}}}},504:{description:"Internal server error while processing the request.",content:{"application/json":{schema:{type:"object",required:["errorMessage"],properties:{errorMessage:{type:"string",description:"Explanation of the server error."}}},examples:{internalServerErrorExample:{summary:"Server Error Example",value:{errorMessage:"Internal server error. Please try again later."}}}}}}}}},"/cards/retrievetransactions":{post:{summary:"Retrieve Card Transactions",description:"Retrieve a list of transactions associated with a specific card.",parameters:[e["#/components/parameters/apiKey"],e["#/components/parameters/contentType"]],tags:["Cards"],requestBody:{description:"Details for fetching transactions.",content:{"application/json":{schema:{type:"object",required:["CardRefNum"],properties:{CardRefNum:{type:"string",description:"The reference number of the card whose transactions are being retrieved."}}}}}},responses:{200:{description:"Successful response",content:{"application/json":{schema:{type:"object",required:["Kind","HasMore"],properties:{Kind:{type:"string",description:"The type of response, indicating transactions."},HasMore:{type:"boolean",description:"Indicates if there are more transactions available beyond the current response."}}},examples:{successResponse:{summary:"Successful Transactions Retrieval",value:{Kind:"Transactions",HasMore:!1}}}}}},400:{description:"Bad request due to invalid input.",content:{"application/json":{schema:{type:"object",required:["errorMessage"],properties:{errorMessage:{type:"string",description:"Explanation of what went wrong."}}},examples:{badRequestExample:{summary:"Invalid Request Example",value:{errorMessage:"Invalid CardRefNum provided."}}}}}},500:{description:"Internal server error while processing the request.",content:{"application/json":{schema:{type:"object",required:["errorMessage"],properties:{errorMessage:{type:"string",description:"No transactions found for the provided CardRefNum."}}},examples:{internalServerErrorExample:{summary:"Server Error Example",value:{errorMessage:"No transactions found for the provided CardRefNum."}}}}}},504:{description:"Gateway Timeout error response",content:{"application/json":{schema:{type:"object",required:["errorMessage"],properties:{errorMessage:{type:"object",required:["errorType","statusCode","errorDetails"],properties:{errorType:{type:"string",description:"Gateway Timeout"},statusCode:{type:"integer",description:"504"},errorDetails:{type:"array",items:{type:"object",properties:{message:{description:"Task timed out after 2.02 seconds",type:"string"}}}}}}}},examples:{gatewayTimeoutExample:{summary:"Gateway Timeout Example",value:{errorMessage:{errorType:"Gateway Timeout",statusCode:504,errorDetails:[{message:"Task timed out after 2.02 seconds"}]}}}}}}}}}},"/cards/createcard":{post:{summary:"Create a New Card",description:"Create a new card by providing a unique CardRefNum.",parameters:[e["#/components/parameters/apiKey"],e["#/components/parameters/contentType"]],tags:["Cards"],requestBody:{description:"Details for creating a new card.",content:{"application/json":{schema:{type:"object",required:["CardRefNum"],properties:{CardRefNum:{type:"string",description:"The reference number for the new card."}}}}}},responses:{200:{description:"Card successfully created.",content:{"application/json":{schema:{type:"object",required:["message"],properties:{message:{type:"string",description:"Card created successfully!."}}},examples:{successResponse:{summary:"Card Created Successfully",value:{message:"Success, CardCreated!"}}}}}},400:{description:"Bad request due to invalid input.",content:{"application/json":{schema:{type:"object",required:["errorMessage"],properties:{errorMessage:{type:"string",description:"Invalid CardRefNum provided."}}},examples:{badRequestExample:{summary:"Invalid Request Example",value:{errorMessage:"Invalid CardRefNum provided."}}}}}},500:{description:"Internal server error while processing the request.",content:{"application/json":{schema:{type:"object",required:["errorMessage"],properties:{errorMessage:{type:"string",description:"Card with this reference number already exists."}}},examples:{internalServerErrorExample:{summary:"Server Error Example",value:{errorMessage:"Card with this reference number already exists."}}}}}},504:{description:"Gateway Timeout error response",content:{"application/json":{schema:{type:"object",required:["errorMessage"],properties:{errorMessage:{type:"object",required:["errorType","statusCode","errorDetails"],properties:{errorType:{type:"string",description:"Gateway Timeout"},statusCode:{type:"integer",description:"504"},errorDetails:{type:"array",items:{type:"object",properties:{message:{description:"Task timed out after 2.02 seconds",type:"string"}}}}}}}},examples:{gatewayTimeoutExample:{summary:"Gateway Timeout Example",value:{errorMessage:{errorType:"Gateway Timeout",statusCode:504,errorDetails:[{message:"Task timed out after 2.02 seconds"}]}}}}}}}}}},"/instantissuing":{post:{summary:"Instant Issuing Request",description:`## Overview
This API endpoint lets you link a pre-produced card to a customer's account. It works in two ways:
-  1- Create Account to a new Customer, and link the pre-produced card. 
-  2- Create Account to an existing customer, and link the pre-produced card. 

You can use this endpoint for both new and existing customers, depending on your needs. Make sure to provide the correct card reference number and RequestType when making the request.

## \`RequestType\`
You **must** set the \`RequestType\` parameter correctly:

- **For new customers:**      \`"1-NewAccountNewCustomer"\`
- **For existing customers:** \`"2-NewAccountExistingCustomer"\`

By correctly setting \`RequestType\` and including all required fields, you ensure that the API can create the account successfully without validation errors.
`,parameters:[e["#/components/parameters/apiKey"],e["#/components/parameters/contentType"]],tags:["Instant Issuing"],requestBody:{required:!0,content:{"application/json":{schema:e["#/components/schemas/Customer"],examples:{default:{value:{RequestType:"NewAccountNewCustomer",LastName:"EEE",FirstName:"Cust02",BirthDate:"1990-01-01",Passport:"76238310075",Email:"test@test.com",MobilePhone:"9991234567",StreetTitle:"Baker's Str",Zip:"WC1X 9NX",AccountNum:"AAABBB150573",BranchName:"Main Branch",CardRefNum:"000515",EmbossedName:"Cust02 New"}}}}}},responses:{200:{description:"Successful response",content:{"application/json":{schema:{type:"object",required:["message"],properties:{message:{type:"string",description:"Request: 'NewAccountNewCustomer' Processed Successfully."}}},examples:{successResponse:{summary:"Successful Request Example",value:{message:"Request: 'NewAccountNewCustomer' Processed Successfully."}}}}}},400:{description:'Bad request response "Wrong Field in the body request"',content:{"application/json":{schema:{type:"object",required:["errorMessage"],properties:{errorMessage:{type:"object",required:["errorType","statusCode","errorDetails"],properties:{errorType:{description:"Bad Request: Invalid Request Body",type:"string"},statusCode:{description:"400",type:"integer"},errorDetails:{type:"array",items:{type:"object",required:["instancePath","schemaPath","keyword","params","message"],properties:{instancePath:{description:"'/body' JSON Pointer to the part of the request body that caused the error",type:"string"},schemaPath:{description:"'#/properties/body/required' JSON Schema path indicating the validation rule that failed",type:"string"},keyword:{description:"'required' Validation keyword that failed",type:"string"},params:{description:"Additional parameters about the validation failure",type:"object",required:"-missingProperty",properties:{missingProperty:{type:"string"}}},message:{description:"'RequestType' Error message describing the validation failure field",type:"string"}}}}}}}},examples:{badRequestExample:{summary:"Bad Request - Missing Required Property",value:{errorMessage:{errorType:"Bad Request: Invalid Request Body",statusCode:400,errorDetails:[{instancePath:"/body",schemaPath:"#/properties/body/required",keyword:"required",params:{missingProperty:"RequestType"},message:"must have required property 'RequestType'"}]}}}}}}},500:{description:"Internal server error response",content:{"application/json":{schema:{type:"object",required:["errorMessage"],properties:{errorMessage:{type:"object",required:["errorType","statusCode","errorDetails"],properties:{errorType:{description:"This Card Is Already Assigned To A Customer!",type:"string"},statusCode:{description:"500",type:"integer"},errorDetails:{type:"array",items:{type:"object",required:["message"],properties:{message:{description:"This Card Is Already Assigned To A Customer!",type:"string"}}}}}}}},examples:{internalServerErrorExample:{summary:"This Card Is Already Assigned To A Customer!",value:{errorMessage:{errorType:"This Card Is Already Assigned To A Customer!",statusCode:"500",errorDetails:[{message:"This Card Is Already Assigned To A Customer!"}]}}}}}}},504:{description:"Gateway Timeout error response",content:{"application/json":{schema:{type:"object",required:["errorMessage"],properties:{errorMessage:{type:"object",required:["errorType","statusCode","errorDetails"],properties:{errorType:{type:"string",description:"Gateway Timeout"},statusCode:{type:"integer",description:"504"},errorDetails:{type:"array",items:{type:"object",properties:{message:{description:"Task timed out after 2.02 seconds",type:"string"}}}}}}}},examples:{gatewayTimeoutExample:{summary:"Gateway Timeout Example",value:{errorMessage:{errorType:"Gateway Timeout",statusCode:504,errorDetails:[{message:"Task timed out after 2.02 seconds"}]}}}}}}}}}}},components:{schemas:{Customer:{required:["RequestType","AccountNum","BranchName","CardRefNum","EmbossedName","NationalId","Passport","FirstName","LastName"],type:"object",properties:{RequestType:{type:"string",description:"- `1-NewAccountNewCustomer`: New customer (requires fields `FirstName`,`LastName`).\n- `2-NewAccountExistingCustomer`: Existing customer.\n"},BranchName:{type:"string",enum:["GTBR"],description:"Branch name `GTBR`"},CardRefNum:{type:"string",description:"Card Reference Number"},EmbossedName:{type:"string",description:"Name to emboss on the card"},AccountNum:{type:"string",description:"Customer's account number"},FirstName:{type:"string",description:" `Mandatory` For new customers (`RequestType: NewAccountNewCustomer`)"},MiddleName:{type:"string"},LastName:{type:"string",description:" `Mandatory` For new customers (`RequestType: NewAccountNewCustomer`)"},NationalId:{type:"string",description:" `Mandatory` if Passport is not provided "},Passport:{type:"string",description:" `Mandatory` if NationalId is not provided "},BirthDate:{type:"string",format:"date",examples:["1990-01-01"]},Email:{type:"string",format:"email"},MobilePhone:{type:"string"},StreetTitle:{type:"string"},Zip:{type:"string"}}}},parameters:{apiKey:{name:"x-api-key",in:"header",required:!0,schema:{type:"string"}},contentType:{name:"Content-Type",in:"header",required:!0,schema:{type:"string",default:"application/json"}}}}};export{t as schema};
//# sourceMappingURL=InstantIssuing.yaml-DaKKUbdx.js.map
