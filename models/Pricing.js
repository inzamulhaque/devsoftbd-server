const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const pricingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "package name is required"],
      unique: true,
      trim: true,
    },

    price: {
      type: String,
      required: [true, "package price is required"],
    },

    services: {
      facebookAdsCampaign: String,
      facebookPageSetup: String,
      createFacebookAdAccount: String,
      targetAudienceResearch: String,
      includeKeywordResearch: String,
      automatedFeedAds: String,
      adContentCreation: String,
      adsAnalyticalReport: String,
      instagramMarketing: String,
      youTubeMarketing: String,
      searchEngineMarketing: String,
      googleAdsAccountSetup: String,
      googleShoppingAds: String,
      googleVideoAds: String,
      googleAnalytics: String,
      keywordResearch: String,
      fullSEOService: String,
      onPageSEO: String,
      offPageSEO: String,
      backlink: String,
      webDevelopment: String,
      webDesign: String,
      support: String,
    },

    addedBy: {
      name: {
        type: String,
        required: [true, "Please provide a employee name"],
      },
      id: {
        type: ObjectId,
        ref: "User",
        required: [true, "Please provide a employee's id"],
      },
    },
  },
  {
    timestamps: true,
  }
);

const Pricing = mongoose.model("Pricing", pricingSchema);

module.exports = Pricing;
