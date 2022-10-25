/* eslint-disable camelcase */
import { useEffect, useRef, useState } from "react";

import { Button, Card, Divider, Segmented, Space, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";

import { JsonEditor } from "@components";

import { TranslationsService } from "@services";

import { useRequests, useUrlParams } from "@hooks";

import { LANGUAGES_KEYS } from "@utils/constants";

const TranslationsList = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const [params, , handleParams] = useUrlParams({
    defaultParams: {
      lang: LANGUAGES_KEYS[0]
    }
  });
  const [data, setData] = useState("");

  const { handleRequest, isLoading } = useRequests();

  const edit = handleRequest(async () => {
    const resp = await TranslationsService.update({
      lang: params.lang,
      translations: editorRef.current.getValue()
    });

    if (resp.status !== 200) throw resp;

    message.success("Запись успешно сохранена!");
    navigate("/translations");
  });

  const fetchData = handleRequest(async () => {
    const resp = await TranslationsService.getOne({ lang: params.lang });
    if (resp.status !== 200) throw resp;

    setData((prevState) => ({ ...prevState, [params.lang]: resp.data }));
  });

  useEffect(() => {
    // if (hasParams && !data.hasOwnProperty(params.lang))
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.lang]);

  return (
    <Card
      title="Переводы"
      extra={
        <Button type="primary" onClick={edit}>
          Редактировать
        </Button>
      }
    >
      <Space size="large" direction="vertical" style={{ display: "flex" }}>
        <Spin spinning={isLoading}>
          <Space size="small" split={<Divider type="vertical" />}>
            <Segmented
              size="large"
              value={params.lang}
              options={LANGUAGES_KEYS}
              onChange={(value) => handleParams("lang", value)}
            />
          </Space>

          {data[params.lang] && (
            <JsonEditor
              editorRef={editorRef}
              options={{
                theme: "spectre",
                iconlib: "spectre",
                compact: true,
                object_layout: "grid",
                remove_button_labels: true,
                disable_edit_json: true,
                disable_properties: true,
                required_by_default: true,
                array_controls_top: true,
                no_additional_properties: true,
                schema: {
                  title: `Перевод ${params.lang.toUpperCase()}`,
                  type: "object",
                  properties: {
                    navigation: {
                      type: "object",
                      title: "Навигация",
                      properties: {
                        news: {
                          type: "string"
                        },
                        blog: {
                          type: "string"
                        },
                        advertisment: {
                          type: "string"
                        },
                        consultation: {
                          type: "string"
                        },
                        regulators: {
                          type: "string"
                        },
                        catalog: {
                          type: "string"
                        },
                        policy: {
                          type: "string"
                        },
                        policy1: {
                          type: "string"
                        },
                        partners: {
                          type: "string"
                        }
                      }
                    },
                    cards: {
                      type: "object",
                      title: "Карточки",
                      properties: {
                        advantages: {
                          type: "array",
                          title: "Преимущества",
                          format: "table",
                          items: {
                            type: "object",
                            properties: {
                              title: {
                                type: "string"
                              },
                              description: {
                                type: "string"
                              }
                            }
                          }
                        },
                        chooseBroker: {
                          type: "array",
                          title: "Выбор брокера",
                          format: "table",
                          items: {
                            type: "object",
                            properties: {
                              title: {
                                type: "string"
                              },
                              description: {
                                type: "string"
                              }
                            }
                          }
                        }
                      }
                    },
                    bin: {
                      type: "object",
                      title: "Мелочи",
                      properties: {
                        all: {
                          type: "string"
                        },
                        aboutUs: {
                          type: "string"
                        },
                        rating: {
                          type: "string"
                        },
                        reviews: {
                          type: "string"
                        },
                        message: {
                          type: "string"
                        },
                        otherPages: {
                          type: "string"
                        },
                        stamp: {
                          type: "string"
                        },
                        orderCall: {
                          type: "string"
                        },
                        consultation: {
                          type: "string"
                        },
                        faq: {
                          type: "string"
                        },
                        lastNews: {
                          type: "string"
                        },
                        seeAllNews: {
                          type: "string"
                        },
                        seeAllReviews: {
                          type: "string"
                        },
                        freeConsultation: {
                          type: "string"
                        },
                        leaveYourData: {
                          type: "string"
                        },
                        orderConsultation: {
                          type: "string"
                        },
                        choosingBroker: {
                          type: "string"
                        },
                        orderFreeConsultation: {
                          type: "string"
                        },
                        learnMore: {
                          type: "string"
                        },
                        insureRisks: {
                          type: "string"
                        },
                        insureYourWallet: {
                          type: "string"
                        },
                        similarNews: {
                          type: "string"
                        },
                        search: {
                          type: "string"
                        },
                        establish: {
                          type: "string"
                        },
                        regulators: {
                          type: "string"
                        },
                        minDeposit: {
                          type: "string"
                        },
                        notSpecified: {
                          type: "string"
                        },
                        schedule: {
                          type: "string"
                        },
                        readRecommendations: {
                          type: "string"
                        },
                        returnMoney: {
                          type: "string"
                        },
                        freeAnalysis: {
                          type: "string"
                        },
                        lastAddedBrokers: {
                          type: "string"
                        },
                        addBroker: {
                          type: "string"
                        },
                        reviewBroker: {
                          type: "string"
                        },
                        feedbacks: {
                          type: "string"
                        },
                        goToFeedback: {
                          type: "string"
                        },
                        independentRating: {
                          type: "string"
                        },
                        readUsIn: {
                          type: "string"
                        },
                        collectReviews: {
                          type: "string"
                        },
                        helpTraders: {
                          type: "string"
                        },
                        tradersCommunity: {
                          type: "string"
                        },
                        leaveComplaint: {
                          type: "string"
                        },
                        leaveFeedbackOnCompany: {
                          type: "string"
                        },
                        companies1: {
                          type: "string"
                        },
                        reviews1: {
                          type: "string"
                        },
                        feedbacks1: {
                          type: "string"
                        },
                        jurisdiction: {
                          type: "string"
                        },
                        getMoney: {
                          type: "string"
                        },
                        leaveFeedback: {
                          type: "string"
                        },
                        aboutCompany: {
                          type: "string"
                        },
                        faq1: {
                          type: "string"
                        },
                        feedbacks2: {
                          type: "string"
                        },
                        mainInformation: {
                          type: "string"
                        },
                        mail: {
                          type: "string"
                        },
                        phone: {
                          type: "string"
                        },
                        country: {
                          type: "string"
                        },
                        site: {
                          type: "string"
                        },
                        faq2: {
                          type: "string"
                        },
                        noReviews: {
                          type: "string"
                        },
                        send: {
                          type: "string"
                        },
                        questions: {
                          type: "string"
                        },
                        manyScammers: {
                          type: "string"
                        },
                        ourAdvantages: {
                          type: "string"
                        },
                        objectiveRating: {
                          type: "string"
                        },
                        haveDoubts: {
                          type: "string"
                        },
                        haveExperience: {
                          type: "string"
                        },
                        payAttentionTo: {
                          type: "string"
                        },
                        inform: {
                          type: "string"
                        },
                        submitting: {
                          type: "string"
                        },
                        close: {
                          type: "string"
                        },
                        thanksForInfo: {
                          type: "string"
                        },
                        complaintText: {
                          type: "string"
                        },
                        thanks: {
                          type: "string"
                        },
                        connectSoon: {
                          type: "string"
                        },
                        companyName: {
                          type: "string"
                        },
                        emptyFaq: {
                          type: "string"
                        },
                        adminCheck: {
                          type: "string"
                        },
                        goToMain: {
                          type: "string"
                        },
                        notFoundTitle: {
                          type: "string"
                        },
                        notFoundDescription: {
                          type: "string"
                        }
                      }
                    },
                    statistics: {
                      type: "object",
                      title: "Статистика",
                      properties: {
                        companies: {
                          type: "string"
                        },
                        overviews: {
                          type: "string"
                        },
                        reviews: {
                          type: "string"
                        }
                      }
                    }
                  }
                },
                startval: data[params.lang]
              }}
            />
          )}
        </Spin>
      </Space>
    </Card>
  );
};

export default TranslationsList;
