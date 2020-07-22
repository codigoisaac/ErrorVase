document
  .querySelector("#issue-input-form")
  .addEventListener("submit", addIssue);

function addIssue(e) {
  let issueDescription = document.querySelector("#issue-description-input")
      .value,
    issueSeverity = document.querySelector("#issue-severity-input").value,
    issueAssign = document.querySelector("#issue-assign-input").value,
    issueId = chance.guid(),
    issueStatus = "Aberto";

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

function setStatus(id) {
  const issues = JSON.parse(localStorage.getItem("issues"));

  // Set status to 'closed' when it is 'open',
  // and to 'open' when it is 'closed'.
  issues.forEach((issue) => {
    if (issue.id == id) {
      issue.status = issue.status == "Aberto" ? "Encerrado" : "Aberto";
    }
  });

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

  issues.forEach((issue) => {
    let id = issue.id,
      description = issue.description,
      severity = issue.severity,
      assign = issue.assign,
      status = issue.status;

    issueList.innerHTML +=
      "<div class='well'>" +
      "<h6>ID: " +
      id +
      "</h6>" +
      "<p><span class='label label-info'>" +
      status +
      "</span></p>" +
      "<h3>" +
      description +
      "</h3>" +
      "<p><span class='glyphicon glyphicon-asterisk'></span> " +
      severity +
      "</p>" +
      "<p><span class='glyphicon glyphicon-user'></span> " +
      assign +
      "</p>" +
      // Change Status
      (issue.status == "Aberto"
        ? "<a href='#' onclick='setStatus(\"" +
          id +
          "\")' class='btn btn-warning' id='btn-status'>Encerrar</a> "
        : "<a href='#' onclick='setStatus(\"" +
          id +
          "\")' class='btn btn-warning' id='btn-status'>Abrir</a> ") +
      // Delete
      "<a href='#' onclick='deleteIssue(\"" +
      id +
      "\")' class='btn btn-danger'>Deletar</a> " +
      "</div>";
  });
}
