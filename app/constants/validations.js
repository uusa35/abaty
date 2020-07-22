import I18n from '../I18n';
import * as Yup from 'yup';

export const submitLogin = {
  email: {
    presence: true,
    email: true,
    length: {
      minimum: 2,
      message: 'must be at least 2 characters.',
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: 'must be at least 6 characters.',
    },
  },
};

export const registerConstrains = {
  name: {
    length: {
      minimum: 3,
      maximum: 50,
    },
    presence: true,
  },
  email: {
    email: true,
    presence: true,
  },
  mobile: {
    length: {
      minimum: 6,
      maximum: 15,
    },
    presence: true,
  },
};

export const storeClassifiedConstrains = {
  name: {length: {minimum: 3}, presence: true},
  price: {
    presence: true,
    length: {
      minimum: 1,
      maximum: 6,
      message: I18n.t('validations.price_at_least_one_number_or_max_six'),
    },
    format: {
      pattern: '[a-z0-9]+',
    },
  },
  mobile: {
    length: {
      minimum: 6,
      maximum: 11,
      message: I18n.t('validations.mobile_at_least_size_numbers_or_max_eleven'),
    },
    presence: true,
  },
  description: {length: {minimum: 5, max: 200}, presence: true},
  image: {presence: {allowEmpty: false}},
  images: {
    presence: {allowEmpty: false},
    length: {
      minimum: 2,
      maximum: 5,
      message: I18n.t('validations.images_tow_only'),
    },
  },
};

export const editClassifiedConstrains = {
  name: {length: {minimum: 3}, presence: true},
  price: {
    presence: true,
    length: {minimum: 1, maximum: 10},
    format: {
      pattern: '[a-z0-9]+',
    },
  },
  mobile: {length: {minimum: 6}, presence: true},
  description: {length: {minimum: 5}, presence: true},
  image: {presence: {allowEmpty: true}},
  images: {presence: {allowEmpty: false}, length: {minimum: 2}},
};

export const commentStoreConstrains = {
  title: {length: {minimum: 3}, presence: true},
  content: {length: {minimum: 3}, presence: true},
};

export const userRegisterRequestConstraints = {
  name: {
    presence: true,
    length: {
      minimum: 5,
      message: 'must be at least 3 characters',
    },
  },
  email: {
    presence: true,
    email: true,
    length: {
      minimum: 4,
      message: 'must be at least 4 characters.',
    },
  },
  description: {
    presence: true,
    length: {
      minimum: 10,
      message: 'must be at least 10 characters.',
    },
  },
  mobile: {
    presence: true,
    length: {
      minimum: 8,
      message: 'must be at least 8 numbers',
    },
  },
  address: {
    presence: true,
    length: {
      minimum: 6,
      message: I18n.t('address_validation_message'),
    },
  },
};

export const forgetPasswordConstrains = {
  mobile: {
    presence: true,
    length: {
      minimum: 6,
      message: 'must be at least 8 numbers',
    },
  },
  email: {
    presence: true,
    email: true,
    length: {
      minimum: 4,
      message: 'must be at least 4 characters.',
    },
  },
};

export const loginConstrains = {
  email: {
    presence: true,
    email: true,
    length: {
      minimum: 4,
      message: 'must be at least 4 characters.',
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: 'must be at least 6 characters',
    },
  },
};

export const validateSubmitRegister = Yup.object().shape({
  name: Yup.string()
    .min(5, {message: 'validations.name_is_required', item: 5})
    .required('validations.name_is_required'),
  // .matches(/^[A-Za-z][A-Za-z0-9]*$/, {
  //   message: 'validations.strings_must_matches_the_expression'
  // }),
  email: Yup.string()
    .email('validations.email_is_required')
    .required({message: 'validations.email_is_required'}),
  password: Yup.string()
    .min(8, {
      message: 'validations.password_is_required',
      item: 6,
    })
    .required({message: 'validations.password_is_required'}),
  address: Yup.string().min(5, {message: 'validations.address_is_required'}),
  description: Yup.string()
    // .required({message: 'validations.description_is_required'})
    .min(10, {message: 'validations.description_is_very_small'}),
  role_id: Yup.number().required(),
  image: Yup.object()
    .typeError({message: 'validations.logo_is_required'})
    .required({
      message: 'validations.logo_is_required',
    }),
  mobile: Yup.string()
    .required({message: 'validations.mobile_is_required'})
    .min(6, {message: 'validations.mobile_is_required'}),
  images: Yup.array()
    .typeError({message: 'validations.product_images_is_required'})
    .required({
      message: 'validations.product_images_is_required',
    }),
  // password2: Yup.string()
  //     .min(6, {
  //       message: 'validations.password_must_not_be_larger_than',
  //       item: 6
  //     })
  //     .oneOf([Yup.ref('password1'), null], 'validations.password_must_match')
});

export const validateChangePassword = Yup.object().shape({
  oldPass: Yup.string().required(),
  newPass: Yup.string().min(8, {
    message: 'validations.password_must_not_be_larger_than',
    item: 8,
  }),
  confirmPass: Yup.string()
    .min(8, {
      message: 'validations.password_must_not_be_larger_than',
      item: 8,
    })
    .oneOf([Yup.ref('newPass'), null], 'validations.password_must_match'),
});

export const validateResetPassword = Yup.object().shape({
  new_password1: Yup.string().min(8, {
    message: 'validations.password_must_not_be_larger_than',
    item: 8,
  }),
  new_password2: Yup.string()
    .min(8, {
      message: 'validations.password_must_not_be_larger_than',
      item: 8,
    })
    .oneOf([Yup.ref('new_password1'), null], 'validations.password_must_match'),
  uid: Yup.string().required(),
  token: Yup.string().required(),
});

export const chooseCountryValidation = Yup.object().shape({
  country: Yup.number()
    .typeError({message: 'validations.country_is_required'})
    .required({message: 'validations.country_is_required'}),
  selectedLanguages: Yup.array().required({
    message: 'validations.language_is_required',
  }),
  image: Yup.mixed().nullable(),
});

export const chooseTitleValidation = Yup.lazy((e) => {
  return Yup.object({
    profession_title_id: Yup.number()
      .typeError({message: 'validations.profession_title_is_required'})
      .required({
        message: 'validations.profession_title_is_required',
      }),
    bio: Yup.string()
      .min(e.validations.min_description_char, {
        message: 'validations.description_must_be_not_less_than',
        item: e.validations.min_description_char,
      })
      .max(1000, {
        message: 'validations.description_must_be_not_larger_than',
        item: 1000,
      })
      .required('validations.bio_is_required'),
    image: Yup.mixed().nullable(),
  });
});

export const chooseSkillsValidation = Yup.lazy((e) =>
  Yup.object({
    skills_ids: Yup.array()
      .min(1, {message: 'validations.skills_are_required', item: 1})
      .required({message: 'validations.skills_are_required'})
      .max(e.validations.max_job_skills, {
        message: 'validations.must_not_be_larger_than',
        item: e.validations.max_job_skills,
      }),
    image: Yup.mixed().nullable(),
  }),
);

export const chooseHourlyRateValidation = Yup.object().shape({
  hour_rate: Yup.number()
    .typeError({message: 'validations.hourly_rate_must_be_number'})
    .min(1, {
      message: 'validations.hourly_rate_must_be_not_less_than',
    })
    .max(100, {
      message: 'validations.hourly_rate_must_be_not_larger_than',
      item: 100,
    })
    .required({message: 'validations.hourly_rate_is_required'}),
  image: Yup.string(),
});

export const createPortfolioValidation = Yup.lazy((e) =>
  Yup.object({
    title: Yup.string()
      .min(e.validations.min_title_char, {
        message: 'validations.title_must_be_not_less_than',
        item: e.validations.min_title_char,
      })
      .max(50, {message: 'validations.title_must_be_not_larger_than', item: 50})
      .required({message: 'validations.title_is_required'}),
    description: Yup.string()
      .min(e.validations.min_description_char, {
        message: 'validations.description_must_be_not_less_than',
        item: e.validations.min_description_char,
      })
      .max(1000, {
        message: 'validations.description_must_be_not_larger_than',
        item: 1000,
      })
      .required({message: 'validations.description_is_required'}),
    completed: Yup.bool(),
    inProgress: Yup.bool(),
    image: Yup.mixed().required({message: 'validations.image_is_required'}),
  }),
);

export const editPortfolioValidation = Yup.lazy((e) =>
  Yup.object({
    title: Yup.string()
      .min(e.validations.min_title_char, {
        message: 'validations.title_must_be_not_less_than',
        item: e.validations.min_title_char,
      })
      .max(50, {message: 'validations.title_must_be_not_larger_than', item: 50})
      .required({message: 'validations.title_is_required'}),
    description: Yup.string()
      .min(e.validations.min_description_char, {
        message: 'validations.description_must_be_not_less_than',
        item: e.validations.min_description_char,
      })
      .max(1000, {
        message: 'validations.description_must_be_not_larger_than',
        item: 1000,
      })
      .required({message: 'validations.description_is_required'}),
    completed: Yup.bool(),
    inProgress: Yup.bool(),
    image: Yup.string().nullable(),
  }),
);

export const verifyPhone = Yup.object().shape({
  mobile: Yup.string()
    .min(6, {message: 'validations.mobile_must_be_not_less_than', item: 6})
    .max(12, {message: 'validations.mobile_must_be_not_larger_than', item: 12})
    .matches(/^[0-9]*$/, {
      message: 'validations.mobile_numbers_must_matches_the_expression',
    })
    .required({message: 'validations.mobile_is_required'}),
});

export const uploadIdentityImage = Yup.object().shape({
  image: Yup.string().required({message: 'validations.image_is_required'}),
});

export const submitAuthValidation = Yup.object().shape({
  email: Yup.string().required({
    message: 'validations.email_or_username_is_required',
  }),
  password: Yup.string()
    .min(5, {message: 'validations.must_be_not_less_than', item: 5})
    .required({message: 'validations.password_is_required'}),
});

export const createPublicJobValidation = Yup.lazy((e) =>
  Yup.object({
    title: Yup.string()
      // .min(e.validations.min_title_char, {
      //   message: 'validations.title_must_be_not_less_than',
      //   item: e.validations.min_title_char
      // })
      // .max(50, {message: 'validations.title_must_be_not_larger_than', item: 50})
      .required({message: 'validations.title_is_required'}),
    description: Yup.string()
      // .min(e.validations.min_description_char, {
      //   message: 'validations.description_must_be_not_less_than',
      //   item: e.validations.min_description_char
      // })
      .max(1000, {
        message: 'validations.description_must_be_not_larger_than',
        item: 1000,
      }),
    // .required({message: 'validations.description_is_required'}),
    selectedCategory: Yup.object().required({
      message: 'validations.category_is_required',
    }),
    selectedRequirement: Yup.object().required({
      message: 'validations.requirement_is_required',
    }),
    selectedSkills: Yup.array()
      .min(1, {message: 'validations.skills_are_required', item: 1})
      .required({message: 'validations.skills_are_required'})
      .max(e.validations.max_job_skills, {
        message: 'validations.must_not_be_larger_than',
        item: e.validations.max_job_skills,
      }),
    budget: Yup.number()
      .typeError({message: 'validations.budget_must_be_number'})
      .min(e.validations.min_job_budget)
      .max(9999, {
        message: 'validations.budget_must_be_not_larger_than',
        item: 9999,
      })
      .required({message: 'validations.budget_is_required'}),
    privacyStatus: Yup.number().required(),
    duration: Yup.number()
      .typeError({message: 'validations.duration_must_be_number'})
      .min(1)
      .max(9999, {
        message: 'validations.duration_must_be_not_larger_than',
        item: 9999,
      })
      .required({message: 'validations.duration_is_required'}),
    // attachments: Yup.array().required({
    //   message: 'validations.attachments_are_required'
    // })
  }),
);

export const createProposalValidation = Yup.lazy((e) => {
  return Yup.object({
    job: Yup.number()
      .typeError({message: 'validations.job_must_be_number'})
      .required({message: 'validations.job_is_required'}),
    budget: Yup.number()
      .typeError({message: 'validations.budget_must_be_number'})
      .min(e.validations.min_job_budget)
      .max(9999, {
        message: 'validations.budget_must_be_not_larger_than',
        item: 999,
      })
      .required({message: 'validations.budget_is_required'}),
    totalBudget: Yup.number()
      .typeError({message: 'validations.total_budget_must_be_number'})
      .min(e.validations.min_job_budget)
      .max(9999, {
        message: 'validations.total_budget_must_be_not_larger_than',
        item: 999,
      })
      .required({message: 'validations.total_budget_is_required'}),
    milestones: Yup.array()
      .required({
        message: 'validations.milestones_are_required',
      })
      .of(
        Yup.object().shape({
          description: Yup.string().required(
            'validations.milestone_description_is_required',
          ),
          budget: Yup.string().required('validations.budget_is_required'),
        }),
      ),
    duration: Yup.number()
      .typeError({message: 'validations.duration_must_be_number'})
      .min(1)
      .max(9999, {
        message: 'validations.duration_must_be_not_larger_than',
        item: 9999,
      })
      .required({message: 'validations.duration_is_required'}),
    description: Yup.string()
      .min(e.validations.min_description_char, {
        message: 'validations.description_must_be_not_less_than',
        item: e.validations.min_description_char,
      })
      .max(1000, {
        message: 'validations.description_must_be_not_larger_than',
        item: 1000,
      })
      .required({message: 'validations.description_is_required'}),
  });
});

export const updateProposalValidation = Yup.lazy((e) => {
  return Yup.object({
    job: Yup.number()
      .typeError({message: 'validations.job_must_be_number'})
      .required({message: 'validations.job_is_required'}),
    budget: Yup.number()
      .typeError({message: 'validations.budget_must_be_number'})
      .min(e.validations.min_job_budget)
      .max(9999, {
        message: 'validations.budget_must_be_not_larger_than',
        item: 999,
      })
      .required({message: 'validations.budget_is_required'}),
    totalBudget: Yup.number()
      .typeError({message: 'validations.total_budget_must_be_number'})
      .min(e.validations.min_job_budget)
      .max(9999, {
        message: 'validations.total_budget_must_be_not_larger_than',
        item: 999,
      })
      .required({message: 'validations.total_budget_is_required'}),
    milestones: Yup.array()
      .required({
        message: 'validations.milestones_are_required',
      })
      .of(
        Yup.object().shape({
          description: Yup.string().required(
            'validations.milestone_description_is_required',
          ),
          budget: Yup.string().required('validations.budget_is_required'),
        }),
      ),
    duration: Yup.number()
      .typeError({message: 'validations.duration_must_be_number'})
      .min(1)
      .max(9999, {
        message: 'validations.duration_must_be_not_larger_than',
        item: 9999,
      })
      .required({message: 'validations.duration_is_required'}),
    description: Yup.string()
      .min(e.validations.min_description_char, {
        message: 'validations.description_must_be_not_less_than',
        item: e.validations.min_description_char,
      })
      .max(1000, {
        message: 'validations.description_must_be_not_larger_than',
        item: 1000,
      })
      .required({message: 'validations.description_is_required'}),
  });
});

export const addBankAccount = Yup.lazy((e) => {
  return Yup.object({
    account_type: Yup.number().required({
      message: 'validations.account_bank_is_required',
    }),
    withdrawal_methode: Yup.number().required({
      message: 'validations.withdrawal_method_is_required',
    }),
    account_holder_name: Yup.string().required({
      message: 'validations.account_holder_name_is_required',
    }),
    account_email: Yup.string().email('validations.must_be_valid_email'),
    billing_country: Yup.string().required({
      message: 'validations.billing_country_is_required',
    }),
    billing_address_1: Yup.string().nullable(),
    billing_address_2: Yup.string().nullable(),
    city: Yup.string()
      .nullable()
      .matches(/^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/, {
        message: 'validations.bank_name_strings_must_matches_the_expression',
      }),
    state_province: Yup.string().nullable(),
    bank_name: Yup.string()
      .matches(/^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/, {
        message: 'validations.bank_name_strings_must_matches_the_expression',
      })
      .required({
        message: 'validations.bank_account_name_is_required',
      }),
    bank_address_1: Yup.string()
      .required({
        message: 'validations.bank_address_one_is_required',
      })
      .matches(/^([A-Za-z]+ )+[A-Za-z0-9]*$/, {
        message:
          'validations.bank_address_one_strings_must_matches_the_expression',
      }),
    bank_address_2: Yup.string()
      .required({
        message: 'validations.bank_address_two_is_required',
      })
      .matches(/^([A-Za-z]+ )+[A-Za-z0-9]*$/, {
        message:
          'validations.bank_address_tow_strings_must_matches_the_expression',
      }),
    bank_address_3: Yup.string()
      .nullable()
      .matches(/^([A-Za-z]+ )+[A-Za-z0-9]*$/, {
        message:
          'validations.bank_address_three_strings_must_matches_the_expression',
      }),
    bank_country: Yup.string().required({
      message: 'validations.bank_country_is_required',
    }),
    routing_sort_ifsc_Code: e.bankRequirements.routing_sort_ifsc_Code
      ? Yup.string()
          .required({message: 'validations.routing_code_is_required'})
          .max(
            e.bankRequirements.routing_sort_ifsc_Code_max
              ? e.bankRequirements.routing_sort_ifsc_Code_max
              : 20,
            {
              message: 'validations.must_be_not_larger_than',
              item: e.bankRequirements.routing_sort_ifsc_Code,
            },
          )
      : null,
    swift_bic_code: e.bankRequirements.swift_bic_code
      ? Yup.string()
          .required({message: 'validations.swift_code_is_required'})
          .max(
            e.bankRequirements.swift_bic_code_max
              ? e.bankRequirements.swift_bic_code_max
              : 20,
            {
              message: 'validations.swift_must_be_not_larger_than',
              item: e.bankRequirements.swift_bic_code_max,
            },
          )
          .matches(/^[A-Za-z][A-Za-z0-9]*$/, {
            message:
              'validations.swift_bic_code_strings_must_matches_the_expression',
          })
      : null,
    confirmData: Yup.boolean().oneOf(
      [true],
      'Must Accept Terms and Conditions',
    ),
    is_primary: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
  });
});

export const addPayPalAccount = Yup.lazy((e) => {
  return Yup.object({
    withdrawal_methode: Yup.number().required({
      message: 'validations.withdrawal_method_is_required',
    }),
    account_holder_name: Yup.string().required({
      message: 'validations.account_holder_name_is_required',
    }),
    account_email: Yup.string().email('validations.must_be_valid_email'),
    billing_country: Yup.string().required({
      message: 'validations.billing_country_is_required',
    }),
    confirmData: Yup.boolean().oneOf(
      [true],
      'Must Accept Terms and Conditions',
    ),
    is_primary: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
  });
});

export const validateNewsLetter = Yup.object().shape({
  email: Yup.string()
    .email('validations.must_be_valid_email')
    .required('validations.email_is_required'),
});

export const validateForgetPassword = Yup.object().shape({
  email: Yup.string()
    .email('validations.must_be_valid_email')
    .required('validations.email_is_required'),
});

export const validateContactus = Yup.object().shape({
  applicant_email: Yup.string()
    .email('validations.must_be_valid_email')
    .required({message: 'validations.email_is_required'})
    .nullable('validations.email_is_required'),
  topic: Yup.string()
    .required('validations.topic_is_required')
    .nullable('validations.topic_is_required'),
  message: Yup.string()
    .required('validations.message_is_required')
    .nullable('validations.message_is_required'),
});

export const validateFinalRating = Yup.object().shape({
  // job_review: Yup.string()
  //     .required({message: 'validations.field_is_required'}),
  job: Yup.number()
    .typeError({message: 'validations.field_is_required'})
    .required({message: 'validations.field_is_required'}),
  work_ethics: Yup.number()
    .typeError({message: 'validations.field_is_required'})
    .required({message: 'validations.field_is_required'}),
  response_time: Yup.number()
    .typeError({message: 'validations.field_is_required'})
    .required({message: 'validations.field_is_required'}),
});
