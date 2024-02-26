const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const db = require('../models');

const Subscriber = db.email_subscribers;

const templatePath = path.join(
  __dirname,
  '..',
  'email_template',
  'emailOnboarding.html'
);
const emailOnboardingTemplate = fs.readFileSync(templatePath, 'utf-8');

const email_notify = async (req, res) => {
  const emailRecieved = req.body.email;

  try {
    if (!emailRecieved) {
      return res.status(400).send({ message: 'Email is required' });
    }

    const existingSubscriber = await Subscriber.findOne({
      where: { email: emailRecieved },
    });

    if (existingSubscriber) {
      return res
        .status(400)
        .send({ message: 'This email is already subscribed' });
    }

    const subscriber_create = {
      email: emailRecieved,
    };

    await Subscriber.create(subscriber_create);

    let transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: 'afiqsam71@gmail.com',
        pass: 'cRJPdN2BzC6xyDO4',
      },
    });

    let info = await transporter.sendMail({
      from: '"Afiq Sam" <afiqsam71@gmail.com>',
      to: emailRecieved,
      subject: 'Testing from Afiq Sam for shot the box email system',
      html: emailOnboardingTemplate,
    });

    return res.status(200).send(info.accepted);
  } catch (error) {
    console.error('Email notification error:', error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};

const email_list = async (req, res) => {
  const PAGE_SIZE = 10;
  const { query } = req;

  const page = query.page;
  const pageSize = query.pageSize || PAGE_SIZE;

  const getSubscribers = await Subscriber.findAll({
    offset: pageSize * (page - 1),
    limit: pageSize,
  });

  const countSubscribers = await Subscriber.count();

  if (getSubscribers) {
    res.status(200).send({
      lists: getSubscribers,
      page,
      pages: Math.ceil(countSubscribers / pageSize),
    });
  } else {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

module.exports = { email_notify, email_list };
