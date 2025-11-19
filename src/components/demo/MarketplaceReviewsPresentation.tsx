"use client";

import { ScrollBasedDemo } from "./ScrollBasedDemo";
import { OzonReviewDemo } from "./OzonReviewDemo";
import { ReviewProcessingFlowDemo } from "./ReviewProcessingFlowDemo";
import { AmoCRMReviewNotificationDemo } from "./AmoCRMReviewNotificationDemo";
import { BotReviewResolutionDemo } from "./BotReviewResolutionDemo";

export function MarketplaceReviewsPresentation() {
  const sections = [
    {
      id: "ozon-review",
      subtitle: "Этап 1",
      title: "Покупатель оставляет негативный отзыв",
      description: [
        "Покупатель приобрел товар, но остался недоволен качеством или доставкой. Он заходит на маркетплейс (например, Ozon) и оставляет негативный отзыв с оценкой 1 звезда.",
        "Обычно такие отзывы висят часами или днями, отпугивая новых клиентов и снижая рейтинг карточки товара.",
        "В нашем случае система мониторинга работает мгновенно.",
      ],
      highlights: [
        "Мгновенная фиксация отзыва",
        "Работает с Ozon, Wildberries и др.",
        "Мониторинг 24/7",
      ],
      demoComponent: <OzonReviewDemo />,
    },
    {
      id: "processing-flow",
      subtitle: "Этап 2",
      title: "ИИ анализирует отзыв",
      description: [
        "Система получает уведомление о новом отзыве через API. Отзыв передается в LLM (Large Language Model) для анализа.",
        "ИИ определяет тональность (негативная), выделяет суть претензии и формирует стратегию ответа.",
        "Это происходит за доли секунды, пока конкуренты даже не знают о проблеме.",
      ],
      highlights: [
        "Анализ тональности",
        "Выделение сути проблемы",
        "Автоматическая классификация",
      ],
      demoComponent: <ReviewProcessingFlowDemo />,
    },
    {
      id: "crm-notification",
      subtitle: "Этап 3",
      title: "Уведомление в CRM",
      description: [
        "Информация о негативном отзыве мгновенно попадает в вашу CRM (например, amoCRM). Создается задача для менеджера или автоматический триггер.",
        "Вы видите не просто текст отзыва, а уже проанализированные данные: причина недовольства, ссылка на заказ, статус клиента.",
        "Ни один негатив не потеряется в потоке уведомлений.",
      ],
      highlights: [
        "Интеграция с amoCRM",
        "Автоматическая постановка задач",
        "Полный контекст проблемы",
      ],
      demoComponent: <AmoCRMReviewNotificationDemo />,
    },
    {
      id: "bot-resolution",
      subtitle: "Этап 4",
      title: "Бот решает проблему",
      description: [
        "Бот автоматически вступает в диалог с клиентом в комментариях или личном чате. Он приносит извинения, предлагает решение (обмен, возврат, бонус) и вежливо просит изменить оценку.",
        "В большинстве случаев, видя быструю и адекватную реакцию, клиент меняет гнев на милость и исправляет 1 звезду на 5.",
        "Конфликт исчерпан, репутация спасена.",
      ],
      highlights: [
        "Автоматический ответ",
        "Решение конфликта",
        "Повышение рейтинга",
      ],
      demoComponent: <BotReviewResolutionDemo />,
    },
  ];

  return (
    <ScrollBasedDemo
      headerTitle="Автоматизация работы с отзывами"
      headerSubtitle="Превращаем негатив в лояльность на автопилоте"
      sections={sections}
    />
  );
}
