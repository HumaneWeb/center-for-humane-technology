import React from 'react';
import { renderNodeRule, StructuredText, StructuredTextDocument } from 'react-datocms';
import {
  isHeading,
  isBlockquote,
  isParagraph,
  isRoot,
  isList,
} from 'datocms-structured-text-utils';
import ImageContentBlock from '../blocks/image-content-block';
import NarrativeBlock from '../blocks/narrative-block';
import ApproachBlock from '../blocks/approach-block';
import NewsletterBlock from '../blocks/newsletter-block';
import ThinkingBlock from '../blocks/thinking-block';
import StatsBlock from '../blocks/stats-block';
import ImpactBlock from '../blocks/impact-block';
import CustomImage from './custom-image';
import ColumnsBlock from '../blocks/columns-block';
import SubstackManualFeed from '../blocks/substack-manual-feed';
import GalleryImageInformationBlock from '../blocks/gallery-image-information-block';
import LinksBlock from '../blocks/links-block';
import Cta from './cta';

export default function CustomStructuredText({
  data,
}: {
  data: Document | Node | StructuredTextDocument | null | undefined;
}) {
  return (
    <StructuredText
      data={data}
      renderBlock={({ record }) => {
        if (record.__typename === 'ImageContentBlockRecord') {
          return <ImageContentBlock key={record.id} {...record} />;
        }
        if (record.__typename === 'NarrativeBlockRecord') {
          return <NarrativeBlock key={record.id} {...record} />;
        }
        if (record.__typename === 'ApproachBlockRecord') {
          return <ApproachBlock key={record.id} {...record} />;
        }
        if (record.__typename === 'SignUpBlockRecord') {
          return <NewsletterBlock key={record.id} {...record} />;
        }
        if (record.__typename === 'ThinkingBlockRecord') {
          return <ThinkingBlock key={record.id} {...record} />;
        }
        if (record.__typename === 'StatsBlockRecord') {
          return <StatsBlock key={record.id} {...record} />;
        }
        if (record.__typename === 'ImpactBlockRecord') {
          return <ImpactBlock key={record.id} {...record} />;
        }
        if (record.__typename === 'ImageBlockRecord') {
          return (
            <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8" key={record.id}>
              <CustomImage {...record.image} />
            </div>
          );
        }
        if (record.__typename === 'ColumnsBlockRecord') {
          return <ColumnsBlock key={record.id} {...record} />;
        }
        if (record.__typename === 'SubstackManualFeedRecord') {
          return <SubstackManualFeed key={record.id} {...record} />;
        }
        if (record.__typename === 'GalleryImageInformationBlockRecord') {
          return <GalleryImageInformationBlock key={record.id} {...record} />;
        }
        if (record.__typename === 'LinksBlockRecord') {
          return <LinksBlock key={record.id} {...record} />;
        }
        if (record.__typename === 'CtaRecord') {
          return (
            <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8" key={record.id}>
              <Cta {...record} />
            </div>
          );
        }

        return null;
      }}
      customNodeRules={[
        renderNodeRule(
          isParagraph,
          ({ adapter: { renderNode }, node, children, key, ancestors }) => {
            if (isRoot(ancestors[0])) {
              return (
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" key={key}>
                  {renderNode(
                    'p',
                    {
                      className:
                        'font-sans text-xl font-medium leading-140 text-primary-navy mb-8 max-w-[840px]',
                    },
                    children,
                  )}
                </div>
              );
            } else {
              return renderNode(
                'p',
                {
                  className:
                    'font-sans text-xl font-medium leading-140 text-primary-navy mb-8 max-w-[840px]',
                },
                children,
              );
            }
          },
        ),
        renderNodeRule(isHeading, ({ adapter: { renderNode }, node, children, key, ancestors }) => {
          return (
            <div className="mx-auto my-10 max-w-7xl items-end px-4 sm:px-6 lg:px-8" key={key}>
              {renderNode(
                `h${node.level}`,
                { className: 'font-sans font-semibold leading-130 text-3xl text-primary-navy' },
                children,
              )}
            </div>
          );
        }),
        renderNodeRule(
          isBlockquote,
          ({ adapter: { renderNode }, node, children, key, ancestors }) => {
            return (
              <div className="max-container-840 center" key={key}>
                {renderNode(
                  'blockquote',
                  { className: '' },
                  <>
                    {children}
                    {node.attribution && <footer>{node.attribution}</footer>}
                  </>,
                )}
              </div>
            );
          },
        ),
        renderNodeRule(isList, ({ adapter: { renderNode }, node, children, key, ancestors }) => {
          if (isRoot(ancestors[0])) {
            return (
              <div className="mx-auto my-10 max-w-7xl items-end px-4 sm:px-6 lg:px-8" key={key}>
                {renderNode('ul', { className: 'list-disc ml-5 [&>li]:mb-5' }, children)}
              </div>
            );
          } else {
            return <React.Fragment key={key}>{children}</React.Fragment>;
          }
        }),
      ]}
    />
  );
}
