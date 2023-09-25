

const welcomeEmail = (user) => {
  const emailData = {
    from: 'No reply <elemental.network.mir@gmail.com>',
    to: user.email,
    subject: 'Welcome to Elemental!',
    templateId: 'd-37bde16aafe54c40bf8fc211699a420b',
    dynamic_template_data: {
      firstName: user.firstName,
      redirectUrl: `${process.env.FRONTEND_URL}/activateaccount/${user.validateToken}`
    }
  }

  return emailData;
}

module.exports = {
  welcomeEmail
}

// welcome template id: d-37bde16aafe54c40bf8fc211699a420b