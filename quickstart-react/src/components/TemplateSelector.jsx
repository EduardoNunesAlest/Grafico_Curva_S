import React, { useState } from 'react';
import { Button, Flex, Heading, Text, Dialog, DialogContentContainer } from '@vibe/core';
import { CHART_TEMPLATES, TEMPLATE_CATEGORIES } from '../constants/templates';
import { mapTemplateToBoard } from '../utils/templateMapper';
import './TemplateSelector.css';

/**
 * Componente de seleção de templates
 * Conforme PRD 2.0 - RF-08 e RF-10
 */
export const TemplateSelector = ({ boardColumns, onSelectTemplate, onSkip }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  const handleApplyTemplate = () => {
    if (selectedTemplate) {
      // Mapeia template para colunas do board
      const mapping = mapTemplateToBoard(selectedTemplate, boardColumns);
      onSelectTemplate(mapping);
    }
  };

  const handleStartFromScratch = () => {
    onSkip();
  };

  return (
    <div className="template-selector">
      <div className="template-selector__header">
        <Heading type={Heading.types.H2} value="Escolha um Template" />
        <Text type={Text.types.TEXT2} color={Text.colors.SECONDARY}>
          Use um template pré-configurado ou comece do zero
        </Text>
      </div>

      <Flex direction={Flex.directions.COLUMN} gap={Flex.gaps.LARGE}>
        {/* Botão: Começar do Zero */}
        <div className="template-card template-card--custom" onClick={handleStartFromScratch}>
          <div className="template-card__icon">⚙️</div>
          <div className="template-card__content">
            <Heading type={Heading.types.H4} value="Começar do Zero" />
            <Text type={Text.types.TEXT2} color={Text.colors.SECONDARY}>
              Configure manualmente todas as opções do gráfico
            </Text>
          </div>
        </div>

        {/* Templates Por Categoria */}
        {TEMPLATE_CATEGORIES.map((category) => {
          const categoryTemplates = CHART_TEMPLATES.filter(
            (t) => t.category === category.name
          );

          if (categoryTemplates.length === 0) return null;

          return (
            <div key={category.id} className="template-category">
              <div className="template-category__header">
                <span className="template-category__icon">{category.icon}</span>
                <Heading type={Heading.types.H3} value={category.name} />
              </div>

              <Flex gap={Flex.gaps.MEDIUM} wrap>
                {categoryTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`template-card ${
                      selectedTemplate?.id === template.id ? 'template-card--selected' : ''
                    }`}
                    onClick={() => handleTemplateClick(template)}
                  >
                    <div className="template-card__icon">{template.icon}</div>
                    <div className="template-card__content">
                      <Heading type={Heading.types.H4} value={template.name} />
                      <Text type={Text.types.TEXT2} color={Text.colors.SECONDARY}>
                        {template.description}
                      </Text>
                    </div>
                  </div>
                ))}
              </Flex>
            </div>
          );
        })}
      </Flex>

      {/* Dialog de Preview do Template */}
      {showPreview && selectedTemplate && (
        <Dialog
          show={showPreview}
          onClose={() => setShowPreview(false)}
          width="medium"
        >
          <DialogContentContainer>
            <Flex direction={Flex.directions.COLUMN} gap={Flex.gaps.LARGE}>
              <div className="template-preview__header">
                <span className="template-preview__icon">{selectedTemplate.icon}</span>
                <Heading type={Heading.types.H2} value={selectedTemplate.name} />
              </div>

              <Text>{selectedTemplate.description}</Text>

              <div className="template-preview__config">
                <Heading type={Heading.types.H4} value="Configuração:" />
                
                <div className="template-preview__section">
                  <Text weight={Text.weights.BOLD}>Eixo X:</Text>
                  <Text type={Text.types.TEXT2}>
                    {selectedTemplate.config.xAxis.label} (colunas de data/timeline)
                  </Text>
                </div>

                <div className="template-preview__section">
                  <Text weight={Text.weights.BOLD}>Curvas:</Text>
                  {selectedTemplate.config.curves.map((curve, index) => (
                    <Flex key={index} align={Flex.align.CENTER} gap={Flex.gaps.SMALL}>
                      <div
                        className="template-preview__color"
                        style={{ backgroundColor: curve.color }}
                      />
                      <Text type={Text.types.TEXT2}>
                        {curve.name} ({curve.unit})
                      </Text>
                    </Flex>
                  ))}
                </div>
              </div>

              <Flex justify={Flex.justify.END} gap={Flex.gaps.MEDIUM}>
                <Button onClick={() => setShowPreview(false)} kind={Button.kinds.TERTIARY}>
                  Cancelar
                </Button>
                <Button onClick={handleApplyTemplate}>
                  Aplicar Template
                </Button>
              </Flex>
            </Flex>
          </DialogContentContainer>
        </Dialog>
      )}
    </div>
  );
};
