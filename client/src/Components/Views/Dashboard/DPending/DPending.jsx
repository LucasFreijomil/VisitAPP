import { useSelector } from 'react-redux';
import { SearchBar } from '../../../SearchBar/SearchBar';
import { DPendingCard } from '../DPendingCard/DPendingCard';
import Styles from './DPending.module.css';

export const DPending = ({setUDetail, setOption, option }) =>
{
    const { toApprove, foundBySearch } = useSelector( state => state );

    return(
            <div className={Styles.toApproveContainer}>
                <SearchBar option={option} />
                    {!foundBySearch && toApprove.length>0 && (
                        toApprove.map( (x, y) =>
                            <DPendingCard key={y} x={x} setUDetail={setUDetail} setOption={setOption}/>
                        )
                    )}

                    {(foundBySearch && foundBySearch.length>0) && (
                        foundBySearch.map( (x, y) =>
                            <DPendingCard key={y} x={x} setUDetail={setUDetail} setOption={setOption}/>
                        )
                    )}

                    {(!Array.isArray(foundBySearch) && typeof foundBySearch === 'object' && foundBySearch !== null) &&
                            <DPendingCard x={foundBySearch} setUDetail={setUDetail} setOption={setOption}/>
                    }

                    {foundBySearch=='404' &&
                    <div>
                        No se encontraron coincidencias con la búsqueda...
                    </div>
                    }
        
                    {
                        toApprove.length==0 && (
                            <p> No hay usuarios pendientes de aprobación ♪ </p>
                    )}
            </div> )
}