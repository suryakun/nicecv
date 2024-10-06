type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  return (
    <div>
      <main>{props.children}</main>
    </div>
  );
}