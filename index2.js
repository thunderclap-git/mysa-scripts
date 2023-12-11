console.log("init 1");

let prefix = "form-input";
let prefix2 = "preview-item";
const Selectors = {
  uploadLogo: `[${prefix}=upload-image]`,
  logoPreview: `[${prefix}=image-preview]`,
  logoUploaded: `[${prefix}=logo]`,
  logoName: `[${prefix}=logo-name]`,
  cancelLogo: `[${prefix}=cancel-logo]`,
  logoErrorLabel: `[${prefix}=logo-error]`,
  companyName: `[${prefix}=company-name]`,
  companyEmail: `[${prefix}=company-email]`,
  companyLocation: `[${prefix}=company-location]`,
  website: `[${prefix}=website]`,
  about: `[${prefix}=about-company]`,
  submitBtn: `[${prefix}=submit-btn]`,
  formEle: `[${prefix}=form-wrapper]`,
  previewBtn: `[${prefix}=preview-btn]`,
  preview: `[page-item=pdf-preview]`,
  logo: `[${prefix2}=logo]`,
  logoWebsite: `[${prefix2}=logo-website]`,
  jobRole: `[${prefix2}=jd-role]`,
  jobAbout: `[${prefix2}=about]`,
  jobLocation: `[${prefix2}=location]`,
  jobTitle: `[${prefix2}=jd-title]`,

  jdFooterText: `[${prefix2}=footer-email]`,
  jdFooterCompanyName: `[${prefix2}=footer-companyName]`,
  jdRoleDescription: `[${prefix2}=role-description]`,
  //popupTitle: `[popup-item=title]`,
  //popupContent: `[popup-item=content]`,
  //dynamicEmbedJD: `[dynamic-embed=jd-gen-component]`,
  //dynamicEmbedSN: `[dynamic-embed=sch-now-component]`,
  //dynamicEmbedGT: `[dynamic-embed=fc-lead-component]`,
  // copyComponentJD: `[cc=customize-jd]`,
  // copyComponentSN: `[cc=sch-now]`,
  // copyComponentGT: `[cc=get-touch]`,
  // mainJDPopup: `[main-popup=jd-form]`,
  staticPDF: `[${prefix2}=static-pdf]`,
};

const getElementRef = (target) => {
  return document.querySelector(target);
};

let formValues = {
  logo: "",
  company_name: "",
  location: "",
  company_email: "",
  website: "",
  //  about_company: "",
};

let imageUploadEle;
const uploadImageEle = getElementRef(Selectors.uploadLogo);
const companyNameEle = getElementRef(Selectors.companyName);
const companyEmailEle = getElementRef(Selectors.companyEmail);
const companyLocationEle = getElementRef(Selectors.companyLocation);
const websiteEle = getElementRef(Selectors.website);
const aboutEle = getElementRef(Selectors.about);
const submitBtnEle = getElementRef(Selectors.submitBtn);
const previewBtnEle = getElementRef(Selectors.previewBtn);
const previewEle = getElementRef(Selectors.preview);
const previewLogoEle = getElementRef(Selectors.logo);
const jobRoleEle = getElementRef(Selectors.jobRole);
const jobLocationEle = getElementRef(Selectors.jobLocation);
const imageErrorMsgEle = getElementRef(Selectors.logoErrorLabel);
const formSubmitEle = getElementRef(Selectors.formEle);

const jobTitleEle = getElementRef(Selectors.jobTitle);
//const jobDescEle = getElementRef(Selectors.jobDesc);
//const popupTitleEle = getElementRef(Selectors.popupTitle);
//const popupContentEle = getElementRef(Selectors.popupContent);
const logoUploadedEle = getElementRef(Selectors.logoUploaded);
const logoNameEle = getElementRef(Selectors.logoName);
//const logowebsiteEle = getElementRef(Selectors.logoWebsite);
const logoPreviewEle = getElementRef(Selectors.logoPreview);
const jobAboutEle = getElementRef(Selectors.jobAbout);
const cancelLogoBtn = getElementRef(Selectors.cancelLogo);
const footerTextEle = getElementRef(Selectors.jdFooterText);
const footerCompanyEle = getElementRef(Selectors.jdFooterCompanyName);
const jdRoleDescriptionEle = getElementRef(Selectors.jdRoleDescription);

console.log("Final Values", formValues);

const createHiddenInputEle = () => {
  imageUploadEle = document.createElement("input");
  imageUploadEle.type = "file";
  imageUploadEle.style.visibility = "hidden";
  //input.multiple = true;
  imageUploadEle.accept = "image/*";
  //imageUploadEle.onchange = handleFiles(imageUploadEle.files);
  uploadImageEle.appendChild(imageUploadEle);

  //logo upload
  imageUploadEle?.addEventListener("change", (e) => {
    handleFiles(e.target.files);
    formValues.logo = e.target.files;
  });
};

const setupListeners = () => {
  uploadImageEle?.addEventListener("click", (e) => {
    console.log("clicked logo upload");
    imageUploadEle?.click();
  });

  cancelLogoBtn.addEventListener("click", (e) => {
    //remove image
    logoUploadedEle.value = "";
    //display image upload
    uploadImageEle.style.display = "flex";
    logoPreviewEle.style.display = "none";
  });

  //company Name
  companyNameEle.addEventListener("change", (e) => {
    formValues.company_name = e.target.value;
    // const finalRole = `Finance Controller at ${e.target.value}`;
    jobRoleEle.innerText = ` @ ${e.target.value}`;
    displayGeneratedJD();
    checkFormValues();
  });

  //company email
  companyEmailEle.addEventListener("change", (e) => {
    formValues.company_email = e.target.value;
    displayGeneratedJD();
    checkFormValues();
  });

  companyLocationEle.addEventListener("change", (e) => {
    formValues.location = e.target.value;
    jobLocationEle.innerText = e.target.value;
    checkFormValues();
  });
  //company website
  websiteEle.addEventListener("change", (e) => {
    formValues.website = e.target.value;
    //logowebsiteEle.innerText = e.target.value;
    const title = `Background (${e.target.value})`;
    jobTitleEle.innerText = title;
    checkFormValues();
  });

  //company description
  aboutEle.addEventListener("change", (e) => {
    formValues.about_company = e.target.value;
    jobAboutEle.innerText = e.target.value;
    checkFormValues();
  });

  submitBtnEle.addEventListener("click", (e) => {
    console.log("submitted", formValues);
    if (formValues.logo === "" || !formValues.logo.length) {
      console.log("inside");
      alert("please upload company logo.");
      e.preventDefault();
      return;
    }

    for (let value of Object.values(formValues)) {
      if (value === "" || !value.length) {
        // e.preventDefault();
        return;
      }
    }

    setTimeout(() => {
      resetForm();
    }, 1800);

    downloadDisplayedJD();
  });

  /*  formSubmitEle.addEventListener("submit", (e) => {
    console.log("submitted", formValues);
    if (formValues.logo === "" || !formValues.logo.length) {
      console.log("inside");
      alert("please upload company logo.");
      e.preventDefault();
      return;
    }
    setTimeout(() => {
      resetForm();
    }, 1500);

    downloadDisplayedJD();
  }); */

  /*  previewBtnEle.addEventListener("click", (e) => {
         e.preventDefault();
         console.log("Final JD values", formValues);
         // const htmlDoc = getHtmlDocument();
 
         downloadDisplayedJD(previewEle);
     }); */
};

const resetForm = () => {
  console.log("resetiing");
  const submissionDoneEle = document.querySelector(".w-form-done");
  if (submissionDoneEle) {
    submissionDoneEle.style.display = "none";
  }

  const formElement = document.getElementById("wf-form-JD-form");
  if (formElement) {
    formElement.style.display = "flex";
  }
};

// ----------- handlers ---------------------
const handleFiles = (uploaded_files) => {
  imageErrorMsgEle.style.display = "none";
  let files = Array.from(uploaded_files);
  console.log("Handle Files", files);

  const logo = uploaded_files[0];

  const logoSize = logo.size / 1024 / 1024;
  if (logoSize > 5) {
    imageErrorMsgEle.style.display = "block";
    imageErrorMsgEle.style.color = "red";
    imageErrorMsgEle.innerText = "File size must be less than 5 MB.";
    return;
  }

  const objectURL = URL.createObjectURL(logo);

  logoUploadedEle.onload = function handleLoad() {
    console.log(
      `Width: ${logoUploadedEle.width}, Height: ${logoUploadedEle.height}`
    );

    if (logoUploadedEle.width > 100 || logoUploadedEle.height > 100) {
      console.log("The image's width or height must be 100px");
      imageErrorMsgEle.style.display = "block";
      imageErrorMsgEle.style.color = "red";
      imageErrorMsgEle.innerText = "The image's width & height must be 100px";
    }

    checkFormValues();
    //  URL.revokeObjectURL(objectURL);
    return;
  };

  //hide upload input
  uploadImageEle.style.display = "none";
  logoUploadedEle.src = objectURL;

  //update image preview
  logoPreviewEle.style.display = "flex";
  logoNameEle.innerText = logo.name;

  //update JD preview
  previewLogoEle.src = objectURL;
  console.log("Display Logo", logo);
};

const displayGeneratedJD = () => {
  const originalText = footerCompanyEle.innerText;
  const modifiedText = originalText.replace(
    /#company_name/g,
    formValues.company_name
  );

  footerCompanyEle.innerText = modifiedText;

  footerTextEle.innerText = formValues.company_email;

  //
  const ogText = jdRoleDescriptionEle.innerText;
  const updatedText = ogText.replace(
    /\[#startup_name\]/g,
    formValues.company_name
  );
  // console.log("updated text", { ogText, updatedText });
  jdRoleDescriptionEle.innerText = updatedText;

  //console.log("company name", modifiedText);
  // popupTitleEle.innerText = "Generated JD";
  // popupContentEle.style.display = "none";
  // previewEle.style.display = "flex";
  // submitBtnEle.style.display = "none";
  // previewBtnEle.style.display = "block";
};

const downloadDisplayedJD = (content, filename = "sample") => {
  const staticPdfEle = getElementRef(Selectors.staticPDF);
  if (staticPdfEle.hasChildNodes()) {
    while (staticPdfEle.firstChild) {
      staticPdfEle.removeChild(staticPdfEle.firstChild);
    }
  }
  const clonePreview = previewEle.cloneNode(true);
  staticPdfEle.appendChild(clonePreview);

  window.html2canvas = html2canvas;
  const doc = new window.jspdf.jsPDF({
    orientation: "p",
    unit: "pt",
  });

  //htmlContent = content.innerHTML.replace(/\s/g, "&nbsp;");

  doc.html(staticPdfEle, {
    callback: function (pdf) {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        console.log("Mobile detected");
        const blob = pdf.output();
        alert("Please check the new tab for the genrated JD");
        window.open(pdf.output("bloburl"), "_blank");
      } else {
        //pdf.save('filename.pdf');
        pdf.save(`jd_FC_${formValues.company_name}.pdf`);
      }
    },
    margin: [24, 24, 24, 24],
    autoPaging: "text",
    html2canvas: {
      // allowTaint: true,
      dpi: 300,
      // letterRendering: true,
      logging: false,
      scale: 0.8,
    },
  });
};

const checkFormValues = () => {
  let allValid = true;
  for (let value of Object.values(formValues)) {
    if (value === "" || !value.length) {
      allValid = false;
    }
  }
  if (allValid) {
    enableSubmitButton();
  } else {
    disableSubmitButton();
  }
};

const enableSubmitButton = () => {
  submitBtnEle.removeAttribute("disabled");
  submitBtnEle.classList.remove("is-disabled");
};

const disableSubmitButton = () => {
  submitBtnEle.setAttribute("disabled", "");
  submitBtnEle.classList.add("is-disabled");
};

window.addEventListener("load", (ev) => {
  // resetWebflow();
  createHiddenInputEle();
  submitBtnEle.setAttribute("disabled", "");
  //cloneJDButton();
  // hidePopup();
  setTimeout(() => {
    setupListeners();
  }, 200);
});
