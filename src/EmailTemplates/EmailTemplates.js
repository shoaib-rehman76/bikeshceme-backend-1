const resetPasswordEmail = function (user, resetURL) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="shortcut icon" href="images/main_logo.svg" type="image/x-icon" />
      <title>Password Reset Confirmation</title>
      <style>
      @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&family=Rubik&display=swap");
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Rubik", sans-serif;
      }

      .container {
        width: 100%;
        min-height: 100vh;
        background-image: url("/images/bg-img-min.webp");
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 100px 0;
      }

      .center {
        width: 550px;
        border-radius: 7px;
        box-shadow: 20px 20px 40px 20px rgba(0, 0, 0, 0.5);
        height: auto;
        background-color: white;
        overflow: hidden;
        margin:auto;
      }

      .logo {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 30px;
        left: 30px;
      }

      .center__top {
        background: url("");
        background-size: cover;
        height: 300px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30px;
        overflow: hidden;
      }

      .center__top--heading,
      span {
        font-size: 38px;
        text-transform: uppercase;
        font-family: "Roboto", sans-serif;
      }

      .baiksceem-image {
        width: 220px;
        height: auto;
        position: relative;
        top: 60px;
        right: 50px;
      }

      @media (max-width: 500px) {
        .baiksceem-image {
          top: 100px;
          right: 50px;
        }
      }

      @media (max-width: 400px) {
        .baiksceem-image {
          top: 100px;
          right: 20px;
        }
      }

      .center__bottom--heading {
        font-size: 22px;
        border-bottom: 1px solid #f1f1f1;
        padding: 20px 0;
        text-align: center;
      }

      .center__bottom--textSection {
        padding: 40px;
        /* border: 3px solid red; */
      }

      .center__bottom--customerName {
        margin-bottom: 20px;
        font-size: 14px;
      }

      .center__bottom--text {
        font-size: 13px;
        line-height: 24px;
      }

      .center__bottom--helpLine {
        font-size: 13px;
        text-align: center;
        margin: 15px 0;
      }

      .center__bottom--loginButton {
        padding: 10px;
        width: 70%;

        cursor: pointer;
        background: #034542;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 12px;
        margin: 15px auto;
      }
    </style>
    </head>
    <body>
      <main class="container">
        <div class="center">
          <div class="center__top">
            <!-- Logo and top section content -->
            <!-- ... -->
          </div>
          <div class="center__bottom">
            <h2 class="center__bottom--heading">Password Reset Confirmation</h2>
            <div class="center__bottom--textSection">
              <p class="center__bottom--customerName">
                <strong>Dear ${user.name},</strong>
              </p>
              <p class="center__bottom--text">
              Click the  below button to reset your password </p>
              <p class="center__bottom--text">
                If you did not request a password reset, kindly ignore this message or contact our support team immediately.
              </p>
              <p class="center__bottom--helpLine">
                For any assistance, our support team is available to help.
              </p>
              <div style="display: grid">
              <a href="${resetURL}"> <button class="center__bottom--loginButton">
              reset Password
            </button></a>
              </div>
              <p class="center__bottom--text">Best regards,</p>
              <p class="center__bottom--text">The baiksceem Team</p>
            </div>
          </div>
        </div>
      </main>
    </body>
    </html>`;
};

const OTP = function (user) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="shortcut icon" href="images/main_logo.svg" type="image/x-icon" />
      <title>OTP Confirmation</title>
      <style>
        @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&family=Rubik&display=swap");
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Rubik", sans-serif;
        }
    
        .container {
          width: 100%;
          min-height: 100vh;
          background-image: url("/images/bg-img-min.webp");
          background-size: cover;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 0;
        }
    
        .center {
          width: 550px;
          border-radius: 7px;
          box-shadow: 20px 20px 40px 20px rgba(0, 0, 0, 0.5);
          height: auto;
          background-color: white;
          overflow: hidden;
        }
     
        .logo {
          width: 50px;
          height: 50px;
          position: absolute;
          top: 30px;
          left: 30px;
        }
    
        .center__top {
          background: url("");
          background-size: cover;
          height: 300px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          overflow: hidden;
        }
    
        .center__top--heading,
        span {
          font-size: 38px;
          text-transform: uppercase;
          font-family: "Roboto", sans-serif;
        }
    
        .baiksceem-image {
          width: 220px;
          height: auto;
          position: relative;
          top: 60px;
          right: 50px;
        }
    
        @media (max-width: 500px) {
          .baiksceem-image {
            top: 100px;
            right: 50px;
          }
        }
    
        @media (max-width: 400px) {
          .baiksceem-image {
            top: 100px;
            right: 20px;
          }
        }
    
        .center__bottom--heading {
          font-size: 22px;
          border-bottom: 1px solid #f1f1f1;
          padding: 20px 0;
          text-align: center;
        }
    
        .center__bottom--textSection {
          padding: 40px;
          /* border: 3px solid red; */
        }
    
        .center__bottom--customerName {
          margin-bottom: 20px;
          font-size: 14px;
        }
    
        .center__bottom--text {
          font-size: 13px;
          line-height: 24px;
        }
    
        .center__bottom--helpLine {
          font-size: 13px;
          text-align: center;
          margin: 15px 0;
        }
    
        .center__bottom--loginButton {
          padding: 10px;
          width: 70%;
    
          cursor: pointer;
          background: #034542;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 12px;
          margin: 15px auto;
        }
      </style>
    </head>
    <body>
      <main class="container">
        <div class="center">
          <div class="center__top">
            <!-- Logo and top section content -->
            <!-- ... -->
          </div>
          <div class="center__bottom">
            <h2 class="center__bottom--heading">OTP Confirmation</h2>
            <div class="center__bottom--textSection">
              <p class="center__bottom--customerName">
                <strong>Dear ${user.name} </strong>
              </p>
              <p class="center__bottom--text">
                Your OTP confirmation is: <strong> ${user.otp} </strong>. Enter this code in the designated field to complete the verification process.
              </p>
              <p class="center__bottom--text">
                If you haven't requested this OTP, please disregard this message or contact our support team immediately.
              </p>
              <p class="center__bottom--helpLine">
                For any assistance, our support team is available to help.
              </p>
              <p class="center__bottom--text">Best regards,</p>
              <p class="center__bottom--text">The  Team</p>
    
            </div>
          </div>
        </div>
      </main>
    </body>
    </html>
    `;
};
const WelcomeEmail = (name, email, password) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="shortcut icon" href="images/main_logo.svg" type="image/x-icon" />
      <title>Welcome to baiksceem</title>
      <style>
        @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&family=Rubik&display=swap");
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Rubik", sans-serif;
        }
    
        .container {
          width: 100%;
          min-height: 100vh;
          background-image: url("/images/bg-img-min.webp");
          background-size: cover;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 0;
        }
    
        .center {
          width: 550px;
          border-radius: 7px;
          box-shadow: 20px 20px 40px 20px rgba(0, 0, 0, 0.5);
          height: auto;
          background-color: white;
          overflow: hidden;
        }
     
        .logo {
          width: 50px;
          height: 50px;
          position: absolute;
          top: 30px;
          left: 30px;
        }
    
        .center__top {
          background: url("");
          background-size: cover;
          height: 300px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          overflow: hidden;
        }
    
        .center__top--heading,
        span {
          font-size: 38px;
          text-transform: uppercase;
          font-family: "Roboto", sans-serif;
        }
    
        .baiksceem-image {
          width: 220px;
          height: auto;
          position: relative;
          top: 60px;
          right: 50px;
        }
    
        @media (max-width: 500px) {
          .baiksceem-image {
            top: 100px;
            right: 50px;
          }
        }
    
        @media (max-width: 400px) {
          .baiksceem-image {
            top: 100px;
            right: 20px;
          }
        }
    
        .center__bottom--heading {
          font-size: 22px;
          border-bottom: 1px solid #f1f1f1;
          padding: 20px 0;
          text-align: center;
        }
    
        .center__bottom--textSection {
          padding: 40px;
        }
    
        .center__bottom--customerName {
          margin-bottom: 20px;
          font-size: 14px;
        }
    
        .center__bottom--text {
          font-size: 13px;
          line-height: 24px;
        }
    
        .center__bottom--helpLine {
          font-size: 13px;
          text-align: center;
          margin: 15px 0;
        }
    
        .center__bottom--loginButton {
          padding: 10px;
          width: 70%;
          cursor: pointer;
          background: #034542;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 12px;
          margin: 15px auto;
          display: block;
          text-align: center;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <main class="container">
        <div class="center">
          <div class="center__top">
         
          </div>
          <div class="center__bottom">
            <h2 class="center__bottom--heading">Account Created</h2>
            <div class="center__bottom--textSection">
              <p class="center__bottom--customerName">
                <strong>Dear ${name},</strong>
              </p>
              <p class="center__bottom--text">
                Your account has been successfully created. Below are your login details:
              </p>
              <p class="center__bottom--text">
                <strong>Email:</strong> ${email}
              </p>
              <p class="center__bottom--text">
                <strong>Password:</strong> ${password}
              </p>
              <p class="center__bottom--text">
                Please log in using the button below to start using your account.
              </p>
              <a href="https://yourwebsite.com/login" class="center__bottom--loginButton">Log In</a>
              <p class="center__bottom--helpLine">
                If you have any questions or need assistance, our support team is available to help.
              </p>
              <p class="center__bottom--text">Best regards,</p>
              <p class="center__bottom--text">The baiksceem Team</p>
            </div>
          </div>
        </div>
      </main>
    </body>
    </html>`;
};

const confirmRegistration = function (user) {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="images/main_logo.svg" type="image/x-icon" />
        <title>Registration-confirmation</title>
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&family=Rubik&display=swap");
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Rubik", sans-serif;
          }
    
          .container {
            width: 100%;
            min-height: 100vh;
            background-image: url("/images/bg-img-min.webp");
            background-size: cover;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 100px 0;
          }
    
          .center {
            width: 550px;
            border-radius: 7px;
            box-shadow: 20px 20px 40px 20px rgba(0, 0, 0, 0.5);
            height: auto;
            background-color: white;
            overflow: hidden;
          }
    
          .logo {
            width: 50px;
            height: 50px;
            position: absolute;
            top: 30px;
            left: 30px;
          }
    
          .center__top {
            background: url("");
            background-size: cover;
            height: 300px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 30px;
            overflow: hidden;
          }
    
          .center__top--heading,
          span {
            font-size: 38px;
            text-transform: uppercase;
            font-family: "Roboto", sans-serif;
          }
    
          .baiksceem-image {
            width: 220px;
            height: auto;
            position: relative;
            top: 60px;
            right: 50px;
          }
    
          @media (max-width: 500px) {
            .baiksceem-image {
              top: 100px;
              right: 50px;
            }
          }
    
          @media (max-width: 400px) {
            .baiksceem-image {
              top: 100px;
              right: 20px;
            }
          }
    
          .center__bottom--heading {
            font-size: 22px;
            border-bottom: 1px solid #f1f1f1;
            padding: 20px 0;
            text-align: center;
          }
    
          .center__bottom--textSection {
            padding: 40px;
            /* border: 3px solid red; */
          }
    
          .center__bottom--customerName {
            margin-bottom: 20px;
            font-size: 14px;
          }
    
          .center__bottom--text {
            font-size: 13px;
            line-height: 24px;
          }
    
          .center__bottom--helpLine {
            font-size: 13px;
            text-align: center;
            margin: 15px 0;
          }
    
          .center__bottom--loginButton {
            padding: 10px;
            width: 70%;
    
            cursor: pointer;
            background: #034542;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 12px;
            margin: 15px auto;
          }
        </style>
      </head>
      <body>
        <main class="container">
          <div class="center">
            <div class="center__top">
              <!-- <img src="images/main_logo.svg" alt="baiksceem-logo" class="logo" />
              <h2 class="center__top--heading">
                Prestige+ <span style="display: block">Rewards</span>
              </h2>
              <img src="images/baiksceem.webp" alt="baiksceem" class="baiksceem-image" /> -->
            </div>
            <div class="center__bottom">
              <h2 class="center__bottom--heading">Welcome to baiksceem</h2>
              <div class="center__bottom--textSection">
                <p class="center__bottom--customerName">
                  <strong>Hey ${user.name} </strong>
                </p>
                <p class="center__bottom--text">
                  Welcome to baiksceem We are thrilled to have you join our
                  community of book lovers. Your account has been successfully
                  created.
                </p>
    
                <p class="center__bottom--helpLine">
                  If you have any questions, our support team is here to help.
                </p>
                <p class="center__bottom--text">Happy reading,</p>
                <p class="center__bottom--text">The baiksceem Team</p>
                <div style="display: grid">
                <a href=""> <button class="center__bottom--loginButton">
                Login to dashboard
              </button></a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
    `;
};

const orderSuccess = function (user, productsTitle, data) {
  return ` <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="images/main_logo.svg" type="image/x-icon" />
        <title>Order Success Confirmation!</title>
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&family=Rubik&display=swap");
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Rubik", sans-serif;
          }
    
          .container {
            width: 100%;
            min-height: 100vh;
            background-image: url("/images/bg-img-min.webp");
            background-size: cover;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 100px 0;
          }
    
          .center {
            width: 550px;
            border-radius: 7px;
            box-shadow: 20px 20px 40px 20px rgba(0, 0, 0, 0.5);
            height: auto;
            background-color: white;
            overflow: hidden;
          }
    
          .logo {
            width: 50px;
            height: 50px;
            position: absolute;
            top: 30px;
            left: 30px;
          }
    
          .center__top {
            background: url("");
            background-size: cover;
            height: 300px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 30px;
            overflow: hidden;
          }
    
          .center__top--heading,
          span {
            font-size: 38px;
            text-transform: uppercase;
            font-family: "Roboto", sans-serif;
          }
    
          .baiksceem-image {
            width: 220px;
            height: auto;
            position: relative;
            top: 60px;
            right: 50px;
          }
    
          @media (max-width: 500px) {
            .baiksceem-image {
              top: 100px;
              right: 50px;
            }
          }
    
          @media (max-width: 400px) {
            .baiksceem-image {
              top: 100px;
              right: 20px;
            }
          }
    
          .center__bottom--heading {
            font-size: 22px;
            border-bottom: 1px solid #f1f1f1;
            padding: 20px 0;
            text-align: center;
          }
    
          .center__bottom--textSection {
            padding: 40px;
            /* border: 3px solid red; */
          }
    
          .center__bottom--customerName {
            margin-bottom: 20px;
            font-size: 14px;
          }
    
          .center__bottom--text {
            font-size: 13px;
            line-height: 24px;
          }
    
          .center__bottom--helpLine {
            font-size: 13px;
            text-align: center;
            margin: 15px 0;
          }
    
          .center__bottom--loginButton {
            padding: 10px;
            width: 70%;
    
            cursor: pointer;
            background: #034542;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 12px;
            margin: 15px auto;
          }
        </style>
      </head>
      <body>
        <main class="container">
          <div class="center">
            <div class="center__top">
              <!-- <img src="images/main_logo.svg" alt="baiksceem-logo" class="logo" />
              <h2 class="center__top--heading">
                baiksceem <span style="display: block">Reward</span>
              </h2>
              <img src="images/baiksceem.webp" alt="baiksceem" class="baiksceem-image" /> -->
            </div>
            <div class="center__bottom">
              <h2 class="center__bottom--heading">Order Success Confirmation!</h2>
              <div class="center__bottom--textSection">
                <p class="center__bottom--customerName">
                  <strong>Hey ${user.name} </strong>
                </p>
                <p class="center__bottom--text">
                  Great news! Your order for ${productsTitle} is successful and now
                  being processed.
                  <br />
                  Order Number:${data.orderNo}
                </p>
    
                <p class="center__bottom--helpLine">
                  We'll notify you once your order is on its way. section.
                </p>
                <p class="center__bottom--text">
                  Thank you for choosing Prestige Reward,
                </p>
                <p class="center__bottom--text">The Prestige Reward Team</p>
                <div style="display: grid">
                <a href=""> <button class="center__bottom--loginButton">
                Login to dashboard
              </button></a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
    `;
};

const orderUpdate = function (user, data, order) {
  return ` <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="images/main_logo.svg" type="image/x-icon" />
        <title>Order Status Update</title>
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&family=Rubik&display=swap");
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Rubik", sans-serif;
          }
    
          .container {
            width: 100%;
            min-height: 100vh;
            background-image: url("/images/bg-img-min.webp");
            background-size: cover;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 100px 0;
          }
    
          .center {
            width: 550px;
            border-radius: 7px;
            box-shadow: 20px 20px 40px 20px rgba(0, 0, 0, 0.5);
            height: auto;
            background-color: white;
            overflow: hidden;
          }
    
          .logo {
            width: 50px;
            height: 50px;
            position: absolute;
            top: 30px;
            left: 30px;
          }
    
          .center__top {
            background: url("");
            background-size: cover;
            height: 300px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 30px;
            overflow: hidden;
          }
    
          .center__top--heading,
          span {
            font-size: 38px;
            text-transform: uppercase;
            font-family: "Roboto", sans-serif;
          }
    
          .baiksceem-image {
            width: 220px;
            height: auto;
            position: relative;
            top: 60px;
            right: 50px;
          }
    
          @media (max-width: 500px) {
            .baiksceem-image {
              top: 100px;
              right: 50px;
            }
          }
    
          @media (max-width: 400px) {
            .baiksceem-image {
              top: 100px;
              right: 20px;
            }
          }
    
          .center__bottom--heading {
            font-size: 22px;
            border-bottom: 1px solid #f1f1f1;
            padding: 20px 0;
            text-align: center;
          }
    
          .center__bottom--textSection {
            padding: 40px;
            /* border: 3px solid red; */
          }
    
          .center__bottom--customerName {
            margin-bottom: 20px;
            font-size: 14px;
          }
    
          .center__bottom--text {
            font-size: 13px;
            line-height: 24px;
          }
    
          .center__bottom--helpLine {
            font-size: 13px;
            text-align: center;
            margin: 15px 0;
          }
    
          .center__bottom--loginButton {
            padding: 10px;
            width: 70%;
    
            cursor: pointer;
            background: #034542;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 12px;
            margin: 15px auto;
          }
        </style>
      </head>
      <body>
        <main class="container">
          <div class="center">
            <div class="center__top">
              <!-- <img src="images/main_logo.svg" alt="baiksceem-logo" class="logo" />
              <h2 class="center__top--heading">
                baiksceem <span style="display: block">Doo</span>
              </h2>
              <img src="images/baiksceem.webp" alt="baiksceem" class="baiksceem-image" /> -->
            </div>
            <div class="center__bottom">
              <h2 class="center__bottom--heading">Order Status Update!</h2>
              <div class="center__bottom--textSection">
                <p class="center__bottom--customerName">
                  <strong>Hey ${user},</strong>
                </p>
                <p class="center__bottom--text">
                  We have an update on your order ${order}.
                  <br />
                  Current Status: ${data}
                </p>
    
                <p class="center__bottom--helpLine">
                  You can track the progress of your order in your account.
                </p>
                <p class="center__bottom--text">Thank you for your patience,</p>
                <p class="center__bottom--text">baiksceem</p>
                <div style="display: grid">
                  <button class="center__bottom--loginButton">
                    Login to dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
    
    `;
};

const Transaction = function (user, order) {
  return ` <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="images/main_logo.svg" type="image/x-icon" />
        <title>Payment Success!</title>
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&family=Rubik&display=swap");
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Rubik", sans-serif;
          }
    
          .container {
            width: 100%;
            min-height: 100vh;
            background-image: url("/images/bg-img-min.webp");
            background-size: cover;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 100px 0;
          }
    
          .center {
            width: 550px;
            border-radius: 7px;
            box-shadow: 20px 20px 40px 20px rgba(0, 0, 0, 0.5);
            height: auto;
            background-color: white;
            overflow: hidden;
            margin:auto;
          }
    
          .logo {
            width: 50px;
            height: 50px;
            position: absolute;
            top: 30px;
            left: 30px;
          }
    
          .center__top {
            background: url("");
            background-size: cover;
            height: 300px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 30px;
            overflow: hidden;
          }
    
          .center__top--heading,
          span {
            font-size: 38px;
            text-transform: uppercase;
            font-family: "Roboto", sans-serif;
          }
    
          .baiksceem-image {
            width: 220px;
            height: auto;
            position: relative;
            top: 60px;
            right: 50px;
          }
    
          @media (max-width: 500px) {
            .baiksceem-image {
              top: 100px;
              right: 50px;
            }
          }
    
          @media (max-width: 400px) {
            .baiksceem-image {
              top: 100px;
              right: 20px;
            }
          }
    
          .center__bottom--heading {
            font-size: 22px;
            border-bottom: 1px solid #f1f1f1;
            padding: 20px 0;
            text-align: center;
          }
    
          .center__bottom--textSection {
            padding: 40px;
            /* border: 3px solid red; */
          }
    
          .center__bottom--customerName {
            margin-bottom: 20px;
            font-size: 14px;
          }
    
          .center__bottom--text {
            font-size: 13px;
            line-height: 24px;
          }
    
          .center__bottom--helpLine {
            font-size: 13px;
            text-align: center;
            margin: 15px 0;
          }
    
          .center__bottom--loginButton {
            padding: 10px;
            width: 70%;
    
            cursor: pointer;
            background: #034542;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 12px;
            margin: 15px auto;
          }
        </style>
      </head>
      <body>
        <main class="container">
          <div class="center">
            <div class="center__top">
              <!-- <img src="images/main_logo.svg" alt="baiksceem-logo" class="logo" />
           
              <img src="images/baiksceem.webp" alt="baiksceem" class="baiksceem-image" /> -->
            </div>
            <div class="center__bottom">
              <h2 class="center__bottom--heading">Payment Success</h2>
              <div class="center__bottom--textSection">
                <p class="center__bottom--customerName">
                  <strong>Hey ${user} </strong>
                </p>
                <p class="center__bottom--text">
    
                  We are pleased to inform you that your payment for order ${order} was successful.
    
                  We are pleased to inform you that your payment for order  was successful.
    
                </p>
    
                <p class="center__bottom--helpLine">
                  Your order is now being processed. We'll keep you updated on its
                  status.
                </p>
                <p class="center__bottom--text">Thank you for shopping with us,</p>
                <p class="center__bottom--text">baiksceem</p>
                <div style="display: grid">
                <a href=""> <button class="center__bottom--loginButton">
                Login to dashboard
              </button></a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
    `;
};

const support = function (user) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="shortcut icon" href="images/main_logo.svg" type="image/x-icon" />
      <title></title>
      <style>
      @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&family=Rubik&display=swap");
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Rubik", sans-serif;
      }

      .container {
        width: 100%;
        min-height: 100vh;
        background-image: url("/images/bg-img-min.webp");
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 100px 0;
      }

      .center {
        width: 550px;
        border-radius: 7px;
        box-shadow: 20px 20px 40px 20px rgba(0, 0, 0, 0.5);
        height: auto;
        background-color: white;
        overflow: hidden;
        margin:auto;
      }

      .logo {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 30px;
        left: 30px;
      }

      .center__top {
        background: url("");
        background-size: cover;
        height: 300px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30px;
        overflow: hidden;
      }

      .center__top--heading,
      span {
        font-size: 38px;
        text-transform: uppercase;
        font-family: "Roboto", sans-serif;
      }

      .baiksceem-image {
        width: 220px;
        height: auto;
        position: relative;
        top: 60px;
        right: 50px;
      }

      @media (max-width: 500px) {
        .baiksceem-image {
          top: 100px;
          right: 50px;
        }
      }

      @media (max-width: 400px) {
        .baiksceem-image {
          top: 100px;
          right: 20px;
        }
      }

      .center__bottom--heading {
        font-size: 22px;
        border-bottom: 1px solid #f1f1f1;
        padding: 20px 0;
        text-align: center;
      }

      .center__bottom--textSection {
        padding: 40px;
        /* border: 3px solid red; */
      }

      .center__bottom--customerName {
        margin-bottom: 20px;
        font-size: 14px;
      }

      .center__bottom--text {
        font-size: 13px;
        line-height: 24px;
      }

      .center__bottom--helpLine {
        font-size: 13px;
        text-align: center;
        margin: 15px 0;
      }

      .center__bottom--loginButton {
        padding: 10px;
        width: 70%;

        cursor: pointer;
        background: #034542;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 12px;
        margin: 15px auto;
      }
    </style>
    </head>
    <body>
    <main class="container">
        <div class="center">
            <div class="center__top">
                <!-- Logo and top section content -->
                <!-- ... -->
            </div>
            <div class="center__bottom">
                <h2 class="center__bottom--heading">Thank You for Your Support</h2>
                <div class="center__bottom--textSection">
                    <p class="center__bottom--customerName">
                        <strong>Dear ${user},</strong>
                    </p>
                    <p class="center__bottom--text">
                        We wanted to express our heartfelt gratitude for your generous support to baiksceem. Your contribution means the world to us and will help us continue creating exciting content for our audience.
                    </p>
                    <p class="center__bottom--text">
                        Our team will review your support and may reach out to you for any additional details if necessary. In the meantime, please feel free to reach out to us if you have any questions or feedback.
                    </p>
                    <p class="center__bottom--text">Once again, thank you for your support!</p>
                    <p class="center__bottom--text">Best regards,</p>
                    <p class="center__bottom--text">baiksceem</p>
                </div>
            </div>
        </div>
    </main>
</body>
    </html>`;
};
const contactUS = function (user) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="shortcut icon" href="images/main_logo.svg" type="image/x-icon" />
      <title>Contact Us - baiksceem</title>
      <style>
      @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&family=Rubik&display=swap");
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Rubik", sans-serif;
      }

      .container {
        width: 100%;
        min-height: 100vh;
        background-image: url("/images/bg-img-min.webp");
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 100px 0;
      }

      .center {
        width: 550px;
        border-radius: 7px;
        box-shadow: 20px 20px 40px 20px rgba(0, 0, 0, 0.5);
        height: auto;
        background-color: white;
        overflow: hidden;
        margin:auto;
      }

      .logo {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 30px;
        left: 30px;
      }

      .center__top {
        background: url("");
        background-size: cover;
        height: 300px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30px;
        overflow: hidden;
      }

      .center__top--heading,
      span {
        font-size: 38px;
        text-transform: uppercase;
        font-family: "Roboto", sans-serif;
      }

      .baiksceem-image {
        width: 220px;
        height: auto;
        position: relative;
        top: 60px;
        right: 50px;
      }

      @media (max-width: 500px) {
        .baiksceem-image {
          top: 100px;
          right: 50px;
        }
      }

      @media (max-width: 400px) {
        .baiksceem-image {
          top: 100px;
          right: 20px;
        }
      }

      .center__bottom--heading {
        font-size: 22px;
        border-bottom: 1px solid #f1f1f1;
        padding: 20px 0;
        text-align: center;
      }

      .center__bottom--textSection {
        padding: 40px;
        /* border: 3px solid red; */
      }

      .center__bottom--customerName {
        margin-bottom: 20px;
        font-size: 14px;
      }

      .center__bottom--text {
        font-size: 13px;
        line-height: 24px;
      }

      .center__bottom--helpLine {
        font-size: 13px;
        text-align: center;
        margin: 15px 0;
      }

      .center__bottom--loginButton {
        padding: 10px;
        width: 70%;

        cursor: pointer;
        background: #034542;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 12px;
        margin: 15px auto;
      }
    </style>
    </head>
    <body>
    <main class="container">
        <div class="center">
            <div class="center__top">
                <!-- Logo and top section content -->
                <!-- ... -->
            </div>
            <div class="center__bottom">
                <h2 class="center__bottom--heading">Thank You for Contacting baiksceem-Doo!</h2>
                <div class="center__bottom--textSection">
                    <p class="center__bottom--customerName">
                        <strong>Dear ${user},</strong>
                    </p>
                    <p class="center__bottom--text">
                        We're thrilled to receive your message. Our team will review your inquiry and get back to you shortly.
                        Your interest in baiksceem-Doo means a lot to us. Thank you for reaching out!
                    </p>
                    <p class="center__bottom--text">Best regards,</p>
                    <p class="center__bottom--text">baiksceem</p>
                </div>
            </div>
        </div>
    </main>
</body>

    </html>`;
};

module.exports = {
  OTP,
  confirmRegistration,
  orderSuccess,
  resetPasswordEmail,
  orderUpdate,
  Transaction,
  contactUS,

  support,

  WelcomeEmail,
};
