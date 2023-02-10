const { totalBlogs } = require("../services/blog.services");
const { totalUnseenContact } = require("../services/contact.services");
const { totalPricing } = require("../services/pricing.services");
const { countOrder } = require("../services/pricingOrder.services");
const { totalReview } = require("../services/review.services");
const { totalUnseenService } = require("../services/service.services");
const { totalSubscriber } = require("../services/subscribe.services");
const { totalMember } = require("../services/team.services");
const { totalUser: totalTell } = require("../services/tellUs.services");
const { totalUser } = require("../services/user.services");

exports.allCount = async (req, res) => {
  try {
    const blogCount = await totalBlogs();
    const contactCount = await totalUnseenContact();
    const pricingCount = await totalPricing();
    const packageOrderCount = await countOrder();
    const reviewCount = await totalReview();
    const servicesOrderCount = await totalUnseenService();
    const subscriberCount = await totalSubscriber();
    const teamMemberCount = await totalMember();
    const tellusCount = await totalTell();
    const userCount = await totalUser();

    res.status(200).json({
      status: true,
      count: {
        blogCount,
        contactCount,
        pricingCount,
        packageOrderCount,
        reviewCount,
        servicesOrderCount,
        subscriberCount,
        teamMemberCount,
        tellusCount,
        userCount,
      },
    });
  } catch (error) {
    res.status(400).json({ status: false });
  }
};
