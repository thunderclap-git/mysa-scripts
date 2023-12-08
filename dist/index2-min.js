let prefix = "form-input",
  prefix2 = "preview-item";
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
    previewBtn: `[${prefix}=preview-btn]`,
    preview: "[page-item=pdf-preview]",
    logo: `[${prefix2}=logo]`,
    logoWebsite: `[${prefix2}=logo-website]`,
    jobRole: `[${prefix2}=jd-role]`,
    jobAbout: `[${prefix2}=about]`,
    jobLocation: `[${prefix2}=location]`,
    jobTitle: `[${prefix2}=jd-title]`,
    jdFooterText: `[${prefix2}=footer-email]`,
    jdFooterCompanyName: `[${prefix2}=footer-companyName]`,
    jdRoleDescription: `[${prefix2}=role-description]`,
    popupTitle: "[popup-item=title]",
    popupContent: "[popup-item=content]",
    dynamicEmbedJD: "[dynamic-embed=jd-gen-component]",
    dynamicEmbedSN: "[dynamic-embed=sch-now-component]",
    dynamicEmbedGT: "[dynamic-embed=fc-lead-component]",
    copyComponentJD: "[cc=customize-jd]",
    copyComponentSN: "[cc=sch-now]",
    copyComponentGT: "[cc=get-touch]",
    mainJDPopup: "[main-popup=jd-form]",
    staticPDF: `[${prefix2}=static-pdf]`,
  },
  getElementRef = (e) => document.querySelector(e);
let imageUploadEle,
  formValues = {
    logo: "",
    company_name: "",
    location: "",
    company_email: "",
    website: "",
    about_company: "",
  };
const uploadImageEle = getElementRef(Selectors.uploadLogo),
  companyNameEle = getElementRef(Selectors.companyName),
  companyEmailEle = getElementRef(Selectors.companyEmail),
  companyLocationEle = getElementRef(Selectors.companyLocation),
  websiteEle = getElementRef(Selectors.website),
  aboutEle = getElementRef(Selectors.about),
  submitBtnEle = getElementRef(Selectors.submitBtn),
  previewBtnEle = getElementRef(Selectors.previewBtn),
  previewEle = getElementRef(Selectors.preview),
  previewLogoEle = getElementRef(Selectors.logo),
  jobRoleEle = getElementRef(Selectors.jobRole),
  jobLocationEle = getElementRef(Selectors.jobLocation),
  imageErrorMsgEle = getElementRef(Selectors.logoErrorLabel),
  jobTitleEle = getElementRef(Selectors.jobTitle),
  popupTitleEle = getElementRef(Selectors.popupTitle),
  popupContentEle = getElementRef(Selectors.popupContent),
  logoUploadedEle = getElementRef(Selectors.logoUploaded),
  logoNameEle = getElementRef(Selectors.logoName),
  logoPreviewEle = getElementRef(Selectors.logoPreview),
  jobAboutEle = getElementRef(Selectors.jobAbout),
  cancelLogoBtn = getElementRef(Selectors.cancelLogo),
  footerTextEle = getElementRef(Selectors.jdFooterText),
  footerCompanyEle = getElementRef(Selectors.jdFooterCompanyName),
  jdRoleDescriptionEle = getElementRef(Selectors.jdRoleDescription),
  createHiddenInputEle = () => {
    (imageUploadEle = document.createElement("input")),
      (imageUploadEle.type = "file"),
      (imageUploadEle.style.visibility = "hidden"),
      (imageUploadEle.accept = "image/*"),
      uploadImageEle.appendChild(imageUploadEle),
      imageUploadEle?.addEventListener("change", (e) => {
        handleFiles(e.target.files);
      });
  },
  setupListeners = () => {
    uploadImageEle?.addEventListener("click", (e) => {
      imageUploadEle?.click();
    }),
      cancelLogoBtn.addEventListener("click", (e) => {
        (logoUploadedEle.value = ""),
          (uploadImageEle.style.display = "flex"),
          (logoPreviewEle.style.display = "none");
      }),
      companyNameEle.addEventListener("change", (e) => {
        (formValues.company_name = e.target.value),
          (jobRoleEle.innerText = ` @ ${e.target.value}`);
      }),
      companyEmailEle.addEventListener("change", (e) => {
        formValues.company_email = e.target.value;
      }),
      companyLocationEle.addEventListener("change", (e) => {
        (formValues.location = e.target.value),
          (jobLocationEle.innerText = e.target.value);
      }),
      websiteEle.addEventListener("change", (e) => {
        formValues.website = e.target.value;
        const o = `Background (${e.target.value})`;
        jobTitleEle.innerText = o;
      }),
      aboutEle.addEventListener("change", (e) => {
        (formValues.about_company = e.target.value),
          (jobAboutEle.innerText = e.target.value);
      }),
      submitBtnEle.addEventListener("click", (e) => {
        setTimeout(() => {
          resetForm();
        }, 1500),
          displayGeneratedJD(),
          downloadDisplayedJD();
      });
  },
  resetForm = () => {
    const e = document.querySelector(".w-form-done");
    e && (e.style.display = "none");
    const o = document.getElementById("wf-form-JD-form");
    o && (o.style.display = "flex");
  },
  handleFiles = (e) => {
    imageErrorMsgEle.style.display = "none";
    Array.from(e);
    const o = e[0];
    if (o.size / 1024 / 1024 > 5)
      return (
        (imageErrorMsgEle.style.display = "block"),
        (imageErrorMsgEle.style.color = "red"),
        void (imageErrorMsgEle.innerText = "File size must be less than 5 MB.")
      );
    const t = URL.createObjectURL(o);
    (logoUploadedEle.onload = function () {
      (logoUploadedEle.width > 100 || logoUploadedEle.height > 100) &&
        ((imageErrorMsgEle.style.display = "block"),
        (imageErrorMsgEle.style.color = "red"),
        (imageErrorMsgEle.innerText =
          "The image's width & height must be 100px"));
    }),
      (uploadImageEle.style.display = "none"),
      (logoUploadedEle.src = t),
      (logoPreviewEle.style.display = "flex"),
      (logoNameEle.innerText = o.name),
      (previewLogoEle.src = t);
  },
  displayGeneratedJD = () => {
    const e = footerCompanyEle.innerText.replace(
      /#company_name/g,
      formValues.company_name
    );
    (footerCompanyEle.innerText = e),
      (footerTextEle.innerText = formValues.company_email);
    const o = jdRoleDescriptionEle.innerText.replace(
      /\[#startup_name\]/g,
      formValues.company_name
    );
    jdRoleDescriptionEle.innerText = o;
  },
  downloadDisplayedJD = (e, o = "sample") => {
    const t = getElementRef(Selectors.staticPDF),
      l = previewEle.cloneNode(!0);
    t.appendChild(l), (window.html2canvas = html2canvas);
    new window.jspdf.jsPDF({ orientation: "p", unit: "pt" }).html(t, {
      callback: function (e) {
        if (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          e.output();
          alert("Please check the new tab for the genrated JD"),
            window.open(e.output("bloburl"), "_blank");
        } else e.save(`jd_FC_${formValues.company_name}.pdf`);
      },
      margin: [24, 24, 24, 24],
      autoPaging: "text",
      html2canvas: { dpi: 300, logging: !1, scale: 0.8 },
    });
  };
window.addEventListener("load", (e) => {
  (imageUploadEle = document.createElement("input")),
    (imageUploadEle.type = "file"),
    (imageUploadEle.style.visibility = "hidden"),
    (imageUploadEle.accept = "image/*"),
    uploadImageEle.appendChild(imageUploadEle),
    imageUploadEle?.addEventListener("change", (e) => {
      handleFiles(e.target.files);
    }),
    setTimeout(() => {
      uploadImageEle?.addEventListener("click", (e) => {
        imageUploadEle?.click();
      }),
        cancelLogoBtn.addEventListener("click", (e) => {
          (logoUploadedEle.value = ""),
            (uploadImageEle.style.display = "flex"),
            (logoPreviewEle.style.display = "none");
        }),
        companyNameEle.addEventListener("change", (e) => {
          (formValues.company_name = e.target.value),
            (jobRoleEle.innerText = ` @ ${e.target.value}`);
        }),
        companyEmailEle.addEventListener("change", (e) => {
          formValues.company_email = e.target.value;
        }),
        companyLocationEle.addEventListener("change", (e) => {
          (formValues.location = e.target.value),
            (jobLocationEle.innerText = e.target.value);
        }),
        websiteEle.addEventListener("change", (e) => {
          formValues.website = e.target.value;
          const o = `Background (${e.target.value})`;
          jobTitleEle.innerText = o;
        }),
        aboutEle.addEventListener("change", (e) => {
          (formValues.about_company = e.target.value),
            (jobAboutEle.innerText = e.target.value);
        }),
        submitBtnEle.addEventListener("click", (e) => {
          setTimeout(() => {
            resetForm();
          }, 1500),
            displayGeneratedJD(),
            downloadDisplayedJD();
        });
    }, 200);
});
