const Container = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '15px',
      }}
    >
      {children}
    </div>
  );
};

export default Container;
