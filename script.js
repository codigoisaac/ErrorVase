document
  .querySelector("#issue-input-form")
  .addEventListener("submit", addIssue);

function addIssue(e) {
  let issueDescription = document.querySelector("#issue-description-input")
      .value,
    issueSeverity = document.querySelector("#issue-severity-input").value,
    issueAssign = document.querySelector("#issue-assign-input").value,
    issueId = chance.guid(),
    issueStatus = "Open";

  let issue = {
    description: issueDescription,
    severity: issueSeverity,
    assign: issueAssign,
    id: issueId,
    status: issueStatus,
  };

  if (localStorage.getItem("issues") == null) {
    // if 'issues' doesn't exist
    let issues = [];
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  } else {
    // if it does exist
    let issues = JSON.parse(localStorage.getItem("issues"));
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  }

  document.querySelector("#issue-input-form").reset();

  fetchIssues();

  e.preventDefault();
}

function setStatusClosed(id) {
  const issues = JSON.parse(localStorage.getItem("issues"));

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = "Encerrado";
    }
  }

  localStorage.setItem("issues", JSON.stringify(issues));

  fetchIssues();
}

function deleteIssue(id) {
  const issues = JSON.parse(localStorage.getItem("issues"));

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem("issues", JSON.stringify(issues));

  fetchIssues();
}

function fetchIssues() {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const issueList = document.querySelector("#issueList");

  issueList.innerHTML = "";

  for (let i = 0; i < issues.length; i++) {
    let id = issues[i].id,
      desc = issues[i].description,
      severity = issues[i].severity,
      assign = issues[i].assign,
      status = issues[i].status;

    issueList.innerHTML +=
      "<div class='well'>" +
      "<h6>ID: " +
      id +
      "</h6>" +
      "<p><span class='label label-info'>" +
      status +
      "</span></p>" +
      "<h3>" +
      desc +
      "</h3>" +
      "<p><span class='glyphicon glyphicon-time'></span>" +
      severity +
      "</p>" +
      "<p><span class='glyphicon glyphicon-user'></span>" +
      assign +
      "</p>" +
      '<a href="#" onclick="setStatusClosed(\'' +
      id +
      '\')" class="btn btn-warning">Encerrar</a> ' +
      '<a href="#" onclick="deleteIssue(\'' +
      id +
      '\')" class="btn btn-danger">Deletar</a>' +
      "</div>";
  }
}
