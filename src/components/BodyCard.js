import React from 'react';

const BodyCard = (props) => {
    const renderedShop = props.data.products.map((shop) => {
        return (
            <tr key={shop.name}>
                <td>{shop.name}</td>
                <td className="text-right">R$ {shop.price.toFixed(2)}</td>
            </tr>
        );
    })
    return (
        <div className="timeline-body">
            <table className="timeline-list">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th className="text-right">Preço</th>
                    </tr>
                </thead>
                <tbody>
                    {renderedShop}
                </tbody>
            </table>
        </div>
    );
}

export default BodyCard