module.exports = ({ name, link }) => {
  return `
    <table
  style="box-sizing: border-box; margin: 0; font-family: 'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif; color: #294661; width: 100%; background: #fdfdfd;"
  width="100%"
>
  <tr
    style="box-sizing: border-box; margin: 0; font-family: 'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif; color: #294661;"
  >
    <td
      class="left-td"
      style="box-sizing: border-box; margin: 0; font-family: 'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif; color: #294661;"
    ></td>
    <td
      class="content"
      style="box-sizing: border-box; font-family: 'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif; color: #294661; width: 600px; max-width: 600px; margin: 0 auto; padding: 30px 0;"
      width="600"
    >
      <div
        class="logo"
        style="box-sizing: border-box; margin: 0; font-family: 'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif; color: #294661; text-align: center; margin-bottom: 30px;"
      >
        <img
          src="http://adda-golpo.herokuapp.com/photos/logo.png"
          alt="Adda Golpo"
          style="box-sizing: border-box; margin: 0; font-family: 'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif; color: #294661; width: 200px;"
          width="200"
        />
      </div>
      <div
        class="content-body"
        style="box-sizing: border-box; margin: 0; font-family: 'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif; color: #294661; width: 100%; background: white; border: 1px solid #f0f0f0; padding: 40px;"
      >
        <h2
          style="box-sizing: border-box; margin: 0; font-family: 'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif; color: #294661;"
        >
          Hello ${name}
        </h2>
        <br
          style="box-sizing: border-box; margin: 0; font-family: 'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif; color: #294661;"
        />
        <p
          style="box-sizing: border-box; margin: 0; font-family: 'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif; color: #294661; font-size: 16px;"
        >
          Someone requested that the password be reset for the following
          account:
        </p>
        <br
          style="box-sizing: border-box; margin: 0; font-family: 'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif; color: #294661;"
        />
        <p
          style="box-sizing: border-box; margin: 0; font-family: 'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif; color: #294661; font-size: 16px;"
        >
          If this was a mistake, just ignore this email and nothing will happen.
        </p>
        <br
          style="box-sizing: border-box; margin: 0; font-family: 'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif; color: #294661;"
        />
        <p
          style="box-sizing: border-box; margin: 0; font-family: 'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif; color: #294661; font-size: 16px;"
        >
          To reset your password, visit the following address:
        </p>
        <br
          style="box-sizing: border-box; margin: 0; font-family: 'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif; color: #294661;"
        />
        <br
          style="box-sizing: border-box; margin: 0; font-family: 'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif; color: #294661;"
        />
        <div
          class="button"
          style="box-sizing: border-box; margin: 0; font-family: 'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif; color: #294661; text-align: center;"
        >
          <a
            href="${link}" 
            style="box-sizing: border-box; margin: 0; font-family: 'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif; color: white; background: #2e3192; padding: 15px; text-decoration: none; border-radius: 35px;"
            >Rest Password</a
          >
        </div>
      </div>
    </td>
    <td
      class="right-td"
      style="box-sizing: border-box; margin: 0; font-family: 'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif; color: #294661;"
    ></td>
  </tr>
</table>

    
    
    `;
};
