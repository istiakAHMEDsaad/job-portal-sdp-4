import { assets, viewApplicationsPageData } from "../assets/assets";

const ManageJobs = () => {
  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Job Title</th>
              <th>Location</th>
              <th>Resume</th>
              <th>Actoin</th>
            </tr>
          </thead>

          <tbody>
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img src={applicant.imgSrc} alt='image' />
                  <span>{applicant.name}</span>
                </td>
                <td>{applicant.jobTitle}</td>
                <td>{applicant.location}</td>
                <td>
                  <a href='#' target='_blank'>
                    Resume{" "}
                    <img src={assets.resume_download_icon} alt='download' />
                  </a>
                </td>
                <td>
                  <div>
                    <button>...</button>
                    <div>
                      <button>Accept</button>
                      <button>Reject</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageJobs;
