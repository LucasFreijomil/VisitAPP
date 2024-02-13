import Styles from './DPendingDetail.module.css';

export const DPendingDetail = ( { uDetail, setOption } ) =>
{

    return(
        
        <div className={Styles.containerDetail}>

            <button className={Styles.backButton} onClick={ () => setOption('pending') }> {'<'} </button>

            <div className={Styles.detailContainer}>

                <div className={Styles.imgContainer}>
                    <img className={Styles.imgDetail} src={uDetail.profileImage ? uDetail.profileImage : "https://cdn-icons-png.flaticon.com/512/4172/4172718.png"} />
                </div>

                <div className={Styles.detailInfo}>
                    <div>
                        <h1 className={Styles.userName}> {uDetail.name} {uDetail.surname} </h1>
                        <h3 className={Styles.brandHolder}> Usuario: { uDetail.username } </h3>
                    </div>

                    <br />
                    <hr />
                    <br />

                    <div className={Styles.detailSize}>

                        <h3 className={Styles.SizeLabel}> Email: { uDetail.email } </h3>

                        <label> Pregunta de seguridad: </label>
                        <h3 className={Styles.SizeLabel}> { uDetail.secQ } </h3>
                        <label> Respuesta de seguridad: </label>
                        <h3 className={Styles.SizeLabel}> { uDetail.secA } </h3>
                        <button onClick={() => console.log("Usuario a detallar: ", uDetail) }> osea </button>

                    </div>
                </div>
            </div>

            <br />
            <hr />

            <div className={Styles.description}>
					<h3> Imagenes que dió para probar que es residente (o texto similar): </h3>
                    { uDetail.reviewImages?.map( (x, y) => <p key={y}> {x} </p>) }
			</div>

        </div>
    )
}

{/* <div className={style.detailContainer}>

					<div className={style.imgContainer}>
						<img className={style.imgDetail} src={cardDetail.image} alt={cardDetail.name} />
					</div>

					<div className={style.detailInfo}>

						<div>
							<h1 className={style.productName}>{cardDetail.name}</h1>
							<p className={style.priceHolder}>${totalPrice}</p>
							<p className={style.brandHolder}>{cardDetail.brand}</p>
						</div>

						<hr />

						<div className={style.detailSize}>
							{cardDetail.type !== 'Shirt' && cardDetail.type !== 'Shoe' ? (
								<p className={style.SizeLabel}>Color: {selectedSize}</p>
							) : (
								<p className={style.SizeLabel}>TALLE: {selectedSize}</p>
							)}
							<div className={style.sizeSelect}>
								{availableSizes.length > 0 ? (
									availableSizes.map(size => (
										<button key={size.id} onClick={() => handleSizeSelection(size)} className={selectedSize === size.id ? style.selectedSize : ''}>
											{size}
										</button>
									))
								) : (
									<p>No hay talles disponibles</p>
								)}
							
							</div>
							<Form.Group className={style.cantidad}>
								<Form.Label className={style.SizeLabel}>CANTIDAD</Form.Label>
								<Form.Control
									className={style.input}
									type='number'
									value={inputValue}
									onChange={handleInputChange}
									onKeyDown={handleKeyDown}
									min='1'
									max='10'
									onClick={event => event.preventDefault()}
								/>
							</Form.Group>
						</div>
						<hr />
						<div className={style.carrito}>
							<button onClick={handleBuy}>Agregar al carrito 🛒</button>
						</div>
					</div>
				</div> */}