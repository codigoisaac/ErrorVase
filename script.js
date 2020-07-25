const form = document.querySelector("#add-error-form");
form.addEventListener("submit", addIssue);

function addIssue(e) {
  // get values from form
  let issueTitle = document.getElementsByName("issue-title")[0].value,
    issueDescription = document.getElementsByName("issue-description")[0].value,
    issueSeverity = document.getElementsByName("issue-severity")[0].value,
    issueAssign = document.getElementsByName("issue-assign")[0].value,
    issueId = chance.guid(),
    issueStatus = "Aberto";

  // create issue obj
  let issue = {
    title: issueTitle,
    description: issueDescription,
    severity: issueSeverity,
    assign: issueAssign,
    id: issueId,
    status: issueStatus,
  };

  // save to the localStorage
  if (localStorage.getItem("issues") == null) {
    // if the 'issues' item doesn't exists
    let issues = [];
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  } else {
    // if the 'issues' item already exists
    let issues = JSON.parse(localStorage.getItem("issues"));
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  }

  form.reset();

  fetchIssues();

  e.preventDefault();
}

function fetchIssues() {
  // get the list of issues saved &
  // the html element to display it
  const issues = getData(),
    issueList = document.querySelector("#issue-list");

  // clean the html before
  issueList.innerHTML = "";

  issues.forEach((issue) => {
    let title = issue.title,
      description = issue.description,
      severity = issue.severity,
      assign = issue.assign,
      id = issue.id,
      status = issue.status;

    // insert the html
    issueList.innerHTML +=
      "<div class='issue" +
      (issue.status == "Aberto" ? " issue-open'" : " issue-closed'") +
      ">" +
      "<div class='id'>ERRO: " +
      id +
      "</div>" +
      "<div class='title-n-status'><div class='title'>" +
      title +
      "</div>" +
      "<div class='status'>" +
      status +
      "</div></div><div class='descr'>" +
      description +
      "</div><div class='severity'>" +
      "<i class='icon fas fa-exclamation-triangle'></i>" +
      severity +
      "</div><div class='assign'>" +
      "<i class='icon fas fa-user-ninja'></i>" +
      assign +
      "</div><div class='buttons'><button onclick='setStatus(\"" +
      id +
      "\")'>" +
      (issue.status == "Aberto" ? "Encerrar" : "Abrir") +
      "</button><button onclick='deleteIssue(\"" +
      id +
      "\")'>Deletar</button></div></div>";
  });
}

function setStatus(id) {
  const issues = getData();

  // change status
  issues.forEach((issue) => {
    if (issue.id == id) {
      issue.status = issue.status == "Aberto" ? "Encerrado" : "Aberto";
    }
  });

  // save again
  localStorage.setItem("issues", JSON.stringify(issues));

  fetchIssues();
}

function deleteIssue(id) {
  const issues = getData();

  // remove the issue with the given id
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }

  // save again
  localStorage.setItem("issues", JSON.stringify(issues));

  fetchIssues();
}

function getData() {
  return JSON.parse(localStorage.getItem("issues"));
}
