import java.awt.*;
import java.awt.image.BufferedImage;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;
import javax.imageio.ImageIO;
import javax.swing.*;

/** Drives the unmodified Swing application; run on an isolated display. */
public class CaptureCarShop {
    private static JFrame frame;
    private static Path output;

    private static <T extends Component> List<T> visible(Container root, Class<T> type) {
        List<T> found = new ArrayList<>();
        for (Component child : root.getComponents()) {
            if (!child.isShowing()) continue;
            if (type.isInstance(child)) found.add(type.cast(child));
            if (child instanceof Container container) found.addAll(visible(container, type));
        }
        return found;
    }

    private static JButton button(Container root, String text) {
        return visible(root, JButton.class).stream().filter(b -> text.equals(b.getText()))
            .findFirst().orElseThrow(() -> new IllegalStateException("Missing button: " + text));
    }

    private static void click(String text) throws Exception {
        SwingUtilities.invokeAndWait(() -> button(frame, text).doClick());
    }

    private static void fill(String... values) throws Exception {
        SwingUtilities.invokeAndWait(() -> {
            List<JTextField> fields = visible(frame, JTextField.class);
            if (fields.size() != values.length) throw new IllegalStateException("Unexpected form");
            for (int i = 0; i < values.length; i++) fields.get(i).setText(values[i]);
        });
    }

    private static void screenshot(String name) throws Exception {
        Thread.sleep(350);
        Container content = frame.getContentPane();
        BufferedImage capture = new BufferedImage(content.getWidth() * 2, content.getHeight() * 2, BufferedImage.TYPE_INT_RGB);
        SwingUtilities.invokeAndWait(() -> {
            Graphics2D graphics = capture.createGraphics();
            graphics.scale(2, 2);
            graphics.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
            // Capture Swing's actual rendered components without a desktop or cursor.
            content.printAll(graphics);
            for (Window window : Window.getWindows()) {
                if (window instanceof JDialog && window.isShowing()) {
                    Graphics2D layer = (Graphics2D) graphics.create();
                    Point origin = content.getLocationOnScreen();
                    Container dialogContent = ((JDialog) window).getContentPane();
                    Point location = dialogContent.getLocationOnScreen();
                    layer.translate(location.x - origin.x, location.y - origin.y);
                    dialogContent.printAll(layer);
                    layer.dispose();
                }
            }
            graphics.dispose();
        });
        ImageIO.write(capture, "png", output.resolve(name + ".png").toFile());
        System.out.println("Captured " + name);
    }

    private static JDialog dialog() throws Exception {
        for (int i = 0; i < 50; i++) {
            for (Window window : Window.getWindows()) {
                if (window instanceof JDialog d && d.isShowing()) return d;
            }
            Thread.sleep(100);
        }
        throw new IllegalStateException("Expected application dialog");
    }

    public static void main(String[] args) throws Exception {
        output = Path.of(args[0]);
        Files.createDirectories(output);
        try {
            SwingUtilities.invokeAndWait(() -> carShop.Main.main(new String[0]));
            frame = (JFrame) Frame.getFrames()[0];
            SwingUtilities.invokeAndWait(() -> frame.setLocation(0, 0));
            fill("Alex Rahman", "Demo Avenue, Dhaka", "DEMO-0001");
            screenshot("01-customer-profile");
            click("Sign Up & Enter Shop");
            screenshot("02-customer-showroom");
            click("Switch to Admin Panel");
            screenshot("03-inventory-dashboard");
            SwingUtilities.invokeAndWait(() -> visible(frame, JTabbedPane.class).get(0).setSelectedIndex(1));
            fill("BMW", "M4", "2024", "18000000", "503", "290", "3.8");
            screenshot("04-sports-car-form");
            SwingUtilities.invokeLater(() -> button(frame, "Add Sports Car").doClick());
            JDialog added = dialog();
            SwingUtilities.invokeAndWait(added::dispose);
            click("Switch to User Panel");
            SwingUtilities.invokeAndWait(() -> {
                JScrollBar bar = visible(frame, JScrollPane.class).get(0).getVerticalScrollBar();
                bar.setValue(bar.getMaximum());
            });
            screenshot("05-sports-showroom");
            SwingUtilities.invokeLater(() -> button(frame, "1/4 Mile Time").doClick());
            JDialog performance = dialog();
            screenshot("06-performance-estimate");
            SwingUtilities.invokeAndWait(performance::dispose);
            SwingUtilities.invokeAndWait(() -> visible(frame, JScrollPane.class).get(0).getVerticalScrollBar().setValue(0));
            SwingUtilities.invokeLater(() -> button(frame, "Purchase").doClick());
            JDialog purchase = dialog();
            screenshot("07-purchase-confirmation");
            SwingUtilities.invokeAndWait(purchase::dispose);
            click("Switch to Admin Panel");
            SwingUtilities.invokeAndWait(() -> {
                List<JScrollPane> panes = visible(frame, JScrollPane.class);
                JScrollBar log = panes.get(panes.size() - 1).getVerticalScrollBar();
                log.setValue(log.getMaximum());
            });
            screenshot("08-customer-purchase-log");
        } finally {
            SwingUtilities.invokeAndWait(() -> {
                for (Window window : Window.getWindows()) window.dispose();
            });
        }
    }
}
