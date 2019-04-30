const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  mobile: { type: Number },
  email: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  imagePath: {
    type: String,
    required: false
  },
  friends: {
    type: [String]
  },
  currentJob: {
    type: String
  },
  currentOrganisation: {
    type: String
  },
  headLiner: {
    type: String
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  domain: {
    type: String
  },
  // followers: {
  //   type: Number
  // },
  education: [
    {
      institutionName: {
        type: String,
        required: false
      },
      degree: {
        type: String,
        required: false
      },
      fieldOfStudy: {
        type: String,
        required: false
      },
      location: {
        type: String,
        required: false
      },
      startYear: {
        type: Date,
        required: false
      },
      endYear: {
        type: Date,
        required: false
      }
      // societyAndActivities: {
      //   type: String
      // }
    }
  ],
  skills: {
    type: [String],
    required: false
  },
  workExperience: [
    {
      companyName: {
        type: String
      },
      location: {
        type: String
      },
      startYear: {
        type: Date
      },
      endYear: {
        type: Date
      },
      designation: {
        type: String
      },
      jobDetails: {
        type: String
      }
    }
  ],
  certification: [
    {
      name: {
        type: String
      },
      description: {
        type: String
      },
      institutionName: {
        type: String
      },
      issueDate: {
        type: Date
      }
    }
  ]
  // post: [
  //   {
  //     title: {
  //       type: String
  //     },
  //     content: {
  //       type: String
  //     }
  //   }
  // ]
});

module.exports = mongoose.model("userProfile", UserProfileSchema);
