import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from './redux/actionCreators/index';
import { RootState } from './redux/store';

const App: React.FC = () => {
    const count = useSelector((state: RootState) => state.count.count);
    const dispatch = useDispatch();

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Count: {count}</h1>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
    );
};

export default App;
