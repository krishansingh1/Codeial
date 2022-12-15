const queue = require("../config/kue");

const commentMailer = require("../mailers/comments_mailer");

queue.process("emails", function (job, done) {
  console.log("Emails worker is proccessing a job", job.data);

  commentMailer.newComment(job.data);

  done();
});
