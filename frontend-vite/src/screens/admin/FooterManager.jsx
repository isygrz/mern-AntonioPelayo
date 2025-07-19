import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFooter, updateFooter } from '../../redux/slices/footerSlice';

const FooterManager = () => {
  const dispatch = useDispatch();
  const { footer, loading } = useSelector((state) => state.footer);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    dispatch(fetchFooter());
  }, [dispatch]);

  useEffect(() => {
    if (footer) setSections(footer.sections);
  }, [footer]);

  const handleSave = () => {
    dispatch(updateFooter({ sections }));
  };

  return (
    <div>
      <h2>Manage Footer</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={handleSave} className="btn btn-primary">
          Save
        </button>
      )}
    </div>
  );
};

export default FooterManager;
