import React from 'react'
import { EuiFlexGrid, EuiFlexItem, EuiCard, EuiFlexGroup, EuiTitle, EuiText, EuiButton } from '@elastic/eui'

export const HitsGrid = ({ data }) => (
  <EuiFlexGrid gutterSize="l">
    {data?.results.hits.items.map((hit) => (
      <EuiFlexItem key={hit.id} grow={2}>
        <EuiCard
          grow={false}
          textAlign="left"
          image={<img src={hit.fields.product_imagelinks} style={{ maxWidth: 200 }} alt="Nature" />}
          title={hit.fields.product_names}
          description={hit.fields.product_links}
        />
      </EuiFlexItem>
    ))}
  </EuiFlexGrid>
)

export const HitsList = ({ data }) => (
  <>
    {data?.results.hits.items.map((hit) => (
      <EuiFlexGroup gutterSize="xl" key={hit.id}>
        <EuiFlexItem>
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <img src={hit.fields.product_imagelinks} alt="Nature" style={{ height: '150px' }} />
            </EuiFlexItem>
            <EuiFlexItem grow={4}>
              <EuiTitle size="xs">
                <h6>{hit.fields.product_names}</h6>
              </EuiTitle>
              <EuiText grow={false}>
                <EuiButton color="secondary" fill>
                    
                <a className="title" href={hit.fields.product_links} target="_blank">Voir Produit</a>
                    <style jsx>
                        {'.title {color: white;}'}
                    </style>
                  
                </EuiButton>
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem grow={2}>
              <EuiText grow={false}>
                <ul>
                  <li>
                    <b>Vendeur: </b>
                    {hit.fields.vendeurs}
                  </li>

                  <li>
                    <b>Prix: </b>
                    {hit.fields.product_prices}
                  </li>
                </ul>
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    ))}
  </>
)
